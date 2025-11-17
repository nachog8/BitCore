import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zglfrjkixqhgbsrdznnp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnbGZyamtpeHFoZ2JzcmR6bm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzODk4NDcsImV4cCI6MjA3ODk2NTg0N30.eWRgLQ0E7f4gAZ-IE3LrmpSJJrh9uUtxPaoDZumEASc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para las respuestas
export interface VotingResponse {
  id?: string;
  grupo?: string;
  que_les_parecio?: number;
  opinion_licitacion?: number;
  que_mejorar?: string;
  created_at?: string;
}

