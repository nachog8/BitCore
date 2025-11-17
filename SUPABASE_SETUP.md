# Configuración de Supabase para el Sistema de Votación

## Pasos para configurar Supabase

### 1. Crear un proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota la URL del proyecto y la clave anónima (anon key)

### 2. Crear la tabla en Supabase

Ve a SQL Editor en tu proyecto de Supabase y ejecuta el siguiente script:

```sql
-- Crear la tabla para almacenar las respuestas
CREATE TABLE voting_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  grupo TEXT,
  que_les_parecio INTEGER CHECK (que_les_parecio >= 1 AND que_les_parecio <= 5),
  opinion_licitacion INTEGER CHECK (opinion_licitacion >= 1 AND opinion_licitacion <= 5),
  que_mejorar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE voting_responses ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir inserción (cualquiera puede votar)
CREATE POLICY "Permitir inserción de respuestas"
  ON voting_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Crear política para permitir lectura (cualquiera puede ver resultados)
CREATE POLICY "Permitir lectura de respuestas"
  ON voting_responses
  FOR SELECT
  TO anon
  USING (true);
```

### 3. Configurar variables de entorno

1. Crea un archivo `.env` en la raíz del proyecto
2. Copia el contenido de `.env.example`
3. Reemplaza los valores con tus credenciales de Supabase:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-aqui
```

### 4. Reiniciar el servidor de desarrollo

Después de configurar las variables de entorno, reinicia el servidor:

```bash
npm run dev
```

## Uso

- **Página de votación**: `/votar` - Los usuarios pueden escanear el QR y responder la encuesta
- **Página de resultados**: `/resultados` - Ver todas las respuestas, estadísticas y exportar a CSV

## Notas

- Las respuestas se guardan automáticamente en Supabase
- Puedes filtrar por grupo en la página de resultados
- Puedes exportar todas las respuestas a CSV para análisis externo
- Las estadísticas se calculan automáticamente

