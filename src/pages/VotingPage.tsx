import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function VotingPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Voto enviado:', {
      rating,
      comment,
      timestamp: new Date().toISOString()
    });

    setSubmitted(true);

    setTimeout(() => {
      setRating(0);
      setComment('');
      setSubmitted(false);
    }, 3000);
  };

  const stars = [1, 2, 3, 4, 5];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
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
          className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Danos tu opinión
          </h1>
          <p className="text-xl text-gray-600 mb-10 text-center">
            Tu feedback nos ayuda a mejorar continuamente
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4 text-center">
                ¿Qué te pareció nuestra presentación?
              </label>
              <div className="flex justify-center gap-3">
                {stars.map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="focus:outline-none transition-all duration-200"
                  >
                    <Star
                      className={`w-12 h-12 md:w-16 md:h-16 transition-all duration-200 ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-4 text-gray-600"
                >
                  {rating === 1 && 'Necesitamos mejorar mucho'}
                  {rating === 2 && 'Hay espacio para mejorar'}
                  {rating === 3 && 'Está bien, pero puede ser mejor'}
                  {rating === 4 && 'Muy buena presentación'}
                  {rating === 5 && '¡Excelente! Nos encanta tu entusiasmo'}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="comment" className="block text-lg font-semibold text-gray-900 mb-3">
                Cuéntanos qué te pareció...
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={6}
                placeholder="Comparte tus ideas, sugerencias o comentarios aquí..."
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 resize-none text-gray-900 placeholder-gray-400"
              />
            </div>

            <motion.button
              type="submit"
              disabled={rating === 0}
              whileHover={rating > 0 ? { scale: 1.02, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' } : {}}
              whileTap={rating > 0 ? { scale: 0.98 } : {}}
              className={`w-full py-5 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                rating === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-green-500 text-white hover:shadow-2xl'
              }`}
            >
              <Send className="w-5 h-5" />
              Enviar Voto
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Tu voto es anónimo y confidencial
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default VotingPage;
