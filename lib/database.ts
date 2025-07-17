import { supabase } from './supabase';

export interface Conversacion {
  id: string;
  cliente_id: string;
  facebook_user_id: string;
  estado: 'activa' | 'pausada' | 'cerrada';
  resumen_contexto: string;
  ultima_actividad: string;
  created_at: string;
  updated_at: string;
}

export interface Mensaje {
  id: string;
  conversacion_id: string;
  contenido: string;
  tipo: 'usuario' | 'bot' | 'humano';
  metadata: any;
  created_at: string;
}

export interface Cliente {
  id: string;
  nombre_negocio: string;
  facebook_page_id: string;
  configuracion: any;
  activo: boolean;
}

// Obtener cliente por Page ID de Facebook
export async function getClienteByPageId(pageId: string): Promise<Cliente | null> {
  try {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('facebook_page_id', pageId)
      .eq('activo', true)
      .single();

    if (error) {
      console.error('Error obteniendo cliente:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error en getClienteByPageId:', error);
    return null;
  }
}

// Obtener o crear conversación
export async function getOrCreateConversacion(clienteId: string, facebookUserId: string): Promise<Conversacion | null> {
  try {
    // Buscar conversación activa existente
    let { data: conversacion, error } = await supabase
      .from('conversaciones')
      .select('*')
      .eq('cliente_id', clienteId)
      .eq('facebook_user_id', facebookUserId)
      .eq('estado', 'activa')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error buscando conversación:', error);
      return null;
    }

    // Si no existe, crear nueva
    if (!conversacion) {
      const { data: nuevaConversacion, error: createError } = await supabase
        .from('conversaciones')
        .insert({
          cliente_id: clienteId,
          facebook_user_id: facebookUserId,
          estado: 'activa',
          resumen_contexto: '',
          ultima_actividad: new Date().toISOString()
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creando conversación:', createError);
        return null;
      }

      conversacion = nuevaConversacion;
    }

    return conversacion;
  } catch (error) {
    console.error('Error en getOrCreateConversacion:', error);
    return null;
  }
}

// Guardar mensaje
export async function guardarMensaje(
  conversacionId: string,
  contenido: string,
  tipo: 'usuario' | 'bot' | 'humano',
  metadata: any = {}
): Promise<Mensaje | null> {
  try {
    const { data, error } = await supabase
      .from('mensajes')
      .insert({
        conversacion_id: conversacionId,
        contenido,
        tipo,
        metadata
      })
      .select()
      .single();

    if (error) {
      console.error('Error guardando mensaje:', error);
      return null;
    }

    // Actualizar última actividad de la conversación
    await supabase
      .from('conversaciones')
      .update({ 
        ultima_actividad: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', conversacionId);

    return data;
  } catch (error) {
    console.error('Error en guardarMensaje:', error);
    return null;
  }
}

// Obtener mensajes recientes
export async function getMensajesRecientes(conversacionId: string, limite: number = 15): Promise<Mensaje[]> {
  try {
    const { data, error } = await supabase
      .from('mensajes')
      .select('*')
      .eq('conversacion_id', conversacionId)
      .order('created_at', { ascending: false })
      .limit(limite);

    if (error) {
      console.error('Error obteniendo mensajes:', error);
      return [];
    }

    return data.reverse(); // Devolver en orden cronológico
  } catch (error) {
    console.error('Error en getMensajesRecientes:', error);
    return [];
  }
}

// Buscar llantas en inventario
export async function buscarLlantas(clienteId: string, medida: string, marca?: string): Promise<any[]> {
  try {
    let query = supabase
      .from('inventario')
      .select('*')
      .eq('cliente_id', clienteId)
      .eq('medida', medida)
      .eq('disponible', true)
      .gt('cantidad', 0);

    if (marca) {
      query = query.ilike('marca', `%${marca}%`);
    }

    const { data, error } = await query
      .order('precio', { ascending: true })
      .limit(10);

    if (error) {
      console.error('Error buscando llantas:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error en buscarLlantas:', error);
    return [];
  }
}

// Buscar medidas compatibles
export async function buscarCompatibles(clienteId: string, medida: string): Promise<any[]> {
  try {
    // Lógica simplificada para medidas compatibles
    // En el futuro se puede expandir con una tabla de compatibilidades
    const { data, error } = await supabase
      .from('inventario')
      .select('medida, COUNT(*) as cantidad')
      .eq('cliente_id', clienteId)
      .eq('disponible', true)
      .gt('cantidad', 0)
      .neq('medida', medida)
      .group('medida')
      .order('cantidad', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error buscando compatibles:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error en buscarCompatibles:', error);
    return [];
  }
}