import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Download, Users, MessageSquare, TrendingUp, Lightbulb, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, VotingResponse } from '../lib/supabase';

function ResultsPage() {
  const [responses, setResponses] = useState<VotingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupFilter, setGroupFilter] = useState<string>('all');

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('voting_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setResponses(data || []);
    } catch (err) {
      console.error('Error al cargar respuestas:', err);
      setError('Hubo un error al cargar las respuestas. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const getUniqueGroups = () => {
    const groups = responses.map(r => r.grupo).filter(Boolean) as string[];
    return Array.from(new Set(groups));
  };

  const filteredResponses = groupFilter === 'all'
    ? responses
    : responses.filter(r => r.grupo === groupFilter);

  const calculateAverage = (field: 'que_les_parecio' | 'opinion_licitacion') => {
    const values = filteredResponses
      .map(r => r[field])
      .filter((v): v is number => typeof v === 'number' && v > 0);
    
    if (values.length === 0) return 0;
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
  };

  const exportToCSV = () => {
    const headers = ['Grupo', '¿Qué les pareció?', 'Opinión Licitación', '¿Qué mejorar?', 'Fecha'];
    const rows = filteredResponses.map(r => [
      r.grupo || '',
      r.que_les_parecio?.toString() || '',
      r.opinion_licitacion?.toString() || '',
      r.que_mejorar || '',
      r.created_at ? new Date(r.created_at).toLocaleString('es-ES') : ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `respuestas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a la presentación
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Resultados de la Encuesta
              </h1>
              <p className="text-gray-600">
                Total de respuestas: {filteredResponses.length}
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={fetchResponses}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Actualizar
              </motion.button>
              <motion.button
                onClick={exportToCSV}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-green-600 text-white rounded-xl flex items-center gap-2 hover:bg-green-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Exportar CSV
              </motion.button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}

          {/* Filtro por grupo */}
          {getUniqueGroups().length > 0 && (
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filtrar por grupo:
              </label>
              <select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              >
                <option value="all">Todos los grupos</option>
                {getUniqueGroups().map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
          )}

          {/* Estadísticas */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">¿Qué les pareció?</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-blue-600">{calculateAverage('que_les_parecio')}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(parseFloat(calculateAverage('que_les_parecio')))
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Promedio de {filteredResponses.length} respuestas</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Opinión Licitación</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-green-600">{calculateAverage('opinion_licitacion')}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(parseFloat(calculateAverage('opinion_licitacion')))
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Promedio de {filteredResponses.length} respuestas</p>
            </div>
          </div>

          {/* Lista de respuestas */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Respuestas Individuales</h2>
            {filteredResponses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No hay respuestas aún</p>
              </div>
            ) : (
              filteredResponses.map((response, index) => (
                <motion.div
                  key={response.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-blue-600" />
                      <span className="font-semibold text-gray-900">{response.grupo || 'Sin grupo'}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {response.created_at
                        ? new Date(response.created_at).toLocaleString('es-ES')
                        : 'Fecha no disponible'}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-700">¿Qué les pareció?</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= (response.que_les_parecio || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-gray-600">({response.que_les_parecio}/5)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-700">Opinión Licitación</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= (response.opinion_licitacion || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-gray-600">({response.opinion_licitacion}/5)</span>
                      </div>
                    </div>
                  </div>

                  {response.que_mejorar && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-amber-600" />
                        <span className="font-medium text-gray-700">¿Qué debería mejorar?</span>
                      </div>
                      <p className="text-gray-600">{response.que_mejorar}</p>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ResultsPage;

