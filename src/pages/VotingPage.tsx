import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle, ArrowLeft, Users, MessageSquare, TrendingUp, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, VotingResponse } from '../lib/supabase';

function VotingPage() {
  const [formData, setFormData] = useState<{
    grupo: string;
    queLesParecio: number;
    opinionLicitacion: number;
    queMejorar: string;
  }>({
    grupo: '',
    queLesParecio: 0,
    opinionLicitacion: 0,
    queMejorar: ''
  });

  const [hoverRatings, setHoverRatings] = useState<{
    queLesParecio: number;
    opinionLicitacion: number;
  }>({
    queLesParecio: 0,
    opinionLicitacion: 0
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRatingChange = (field: 'queLesParecio' | 'opinionLicitacion', value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación
    if (!formData.grupo.trim()) {
      setError('Por favor, indica qué grupo son');
      return;
    }

    if (formData.queLesParecio === 0) {
      setError('Por favor, califica qué les pareció');
      return;
    }

    if (formData.opinionLicitacion === 0) {
      setError('Por favor, califica tu opinión sobre la licitación');
      return;
    }

    setIsSubmitting(true);

    try {
      const response: VotingResponse = {
        grupo: formData.grupo.trim(),
        que_les_parecio: formData.queLesParecio,
        opinion_licitacion: formData.opinionLicitacion,
        que_mejorar: formData.queMejorar.trim() || undefined,
        created_at: new Date().toISOString()
      };

      const { error: supabaseError } = await supabase
        .from('voting_responses')
        .insert([response]);

      if (supabaseError) {
        throw supabaseError;
      }

      setSubmitted(true);

      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          grupo: '',
          queLesParecio: 0,
          opinionLicitacion: 0,
          queMejorar: ''
        });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Error al guardar respuesta:', err);
      setError('Hubo un error al guardar tu respuesta. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stars = [1, 2, 3, 4, 5];

  const getRatingText = (rating: number) => {
    const texts: { [key: number]: string } = {
      1: 'Muy malo',
      2: 'Malo',
      3: 'Regular',
      4: 'Bueno',
      5: 'Excelente'
    };
    return texts[rating] || '';
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-24 h-24 mx-auto text-green-500 mb-6" />
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Gracias por tu feedback!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Tu opinión es muy valiosa para nosotros
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a la presentación
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full"
      >
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a la presentación
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Encuesta de Feedback
          </h1>
          <p className="text-xl text-gray-600 mb-10 text-center">
            Tu opinión nos ayuda a mejorar continuamente
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Pregunta 1: Grupo */}
            <div>
              <label htmlFor="grupo" className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
                <Users className="w-6 h-6 text-blue-600" />
                ¿Qué numero de grupo son?
              </label>
              <input
                id="grupo"
                type="text"
                value={formData.grupo}
                onChange={(e) => setFormData(prev => ({ ...prev, grupo: e.target.value }))}
                placeholder="Ej: Grupo 1, Grupo 2, etc."
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Pregunta 2: ¿Qué les pareció? */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                ¿Qué les pareció nuestra presentación?
              </label>
              <div className="flex justify-center gap-3 mb-4">
                {stars.map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange('queLesParecio', star)}
                    onMouseEnter={() => setHoverRatings(prev => ({ ...prev, queLesParecio: star }))}
                    onMouseLeave={() => setHoverRatings(prev => ({ ...prev, queLesParecio: 0 }))}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none transition-all duration-200"
                  >
                    <Star
                      className={`w-12 h-12 md:w-16 md:h-16 transition-all duration-200 ${
                        star <= (hoverRatings.queLesParecio || formData.queLesParecio)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {formData.queLesParecio > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-gray-600 font-medium"
                >
                  {getRatingText(formData.queLesParecio)} ({formData.queLesParecio} estrellas)
                </motion.p>
              )}
            </div>

            {/* Pregunta 3: Opinión sobre la licitación */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                ¿Qué puntaje le dan a la empresa en cuanto a cómo resolvimos la licitación?
              </label>
              <div className="flex justify-center gap-3 mb-4">
                {stars.map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange('opinionLicitacion', star)}
                    onMouseEnter={() => setHoverRatings(prev => ({ ...prev, opinionLicitacion: star }))}
                    onMouseLeave={() => setHoverRatings(prev => ({ ...prev, opinionLicitacion: 0 }))}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none transition-all duration-200"
                  >
                    <Star
                      className={`w-12 h-12 md:w-16 md:h-16 transition-all duration-200 ${
                        star <= (hoverRatings.opinionLicitacion || formData.opinionLicitacion)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {formData.opinionLicitacion > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-gray-600 font-medium"
                >
                  {getRatingText(formData.opinionLicitacion)} ({formData.opinionLicitacion} estrellas)
                </motion.p>
              )}
            </div>

            {/* Pregunta 4: ¿Qué debería mejorar? */}
            <div>
              <label htmlFor="queMejorar" className="flex items-center gap-3 text-lg font-semibold text-gray-900 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
                ¿Qué crees que debería mejorar nuestra empresa?
              </label>
              <textarea
                id="queMejorar"
                value={formData.queMejorar}
                onChange={(e) => setFormData(prev => ({ ...prev, queMejorar: e.target.value }))}
                rows={6}
                placeholder="Comparte tus ideas, sugerencias o comentarios aquí..."
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 resize-none text-gray-900 placeholder-gray-400"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || !formData.grupo.trim() || formData.queLesParecio === 0 || formData.opinionLicitacion === 0}
              whileHover={
                !isSubmitting && formData.grupo.trim() && formData.queLesParecio > 0 && formData.opinionLicitacion > 0
                  ? { scale: 1.02, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }
                  : {}
              }
              whileTap={
                !isSubmitting && formData.grupo.trim() && formData.queLesParecio > 0 && formData.opinionLicitacion > 0
                  ? { scale: 0.98 }
                  : {}
              }
              className={`w-full py-5 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                isSubmitting || !formData.grupo.trim() || formData.queLesParecio === 0 || formData.opinionLicitacion === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-green-500 text-white hover:shadow-2xl'
              }`}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Respuesta
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Tus respuestas son confidenciales y nos ayudan a mejorar
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default VotingPage;
