import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, AlertCircle, CheckCircle, TrendingUp, Users, Clock, Target } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

function LandingPage() {
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const qrRef = useRef(null);

  const problemInView = useInView(problemRef, { once: true, margin: '-100px' });
  const solutionInView = useInView(solutionRef, { once: true, margin: '-100px' });
  const qrInView = useInView(qrRef, { once: true, margin: '-100px' });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentUrl = window.location.origin + '/votar';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-70" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 relative z-10 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <Target className="w-20 h-20 mx-auto text-blue-600 mb-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            Transformando Desafíos en
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500"> Oportunidades</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Una solución innovadora que revoluciona la forma en que abordamos los problemas empresariales
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('problema')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3 group"
          >
            Descubre Nuestra Historia
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <section id="problema" ref={problemRef} className="min-h-screen flex items-center py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <AlertCircle className="w-16 h-16 mx-auto text-orange-500 mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              La Problemática
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un desafío que estaba limitando el crecimiento y la eficiencia de la organización
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Clock, title: 'Pérdida de Tiempo', description: 'Los procesos manuales consumían horas valiosas del equipo', delay: 0.2 },
              { icon: Users, title: 'Falta de Coordinación', description: 'La comunicación entre departamentos era ineficiente', delay: 0.4 },
              { icon: TrendingUp, title: 'Crecimiento Limitado', description: 'La escalabilidad del negocio estaba comprometida', delay: 0.6 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={problemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: item.delay }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <item.icon className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={problemInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 p-10 rounded-3xl max-w-4xl mx-auto border border-orange-100"
          >
            <p className="text-xl text-gray-700 text-center leading-relaxed">
              <span className="font-semibold text-orange-600">El resultado:</span> Una empresa atrapada en operaciones ineficientes, perdiendo oportunidades de mercado y enfrentando la frustración diaria de su equipo.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="solucion" ref={solutionRef} className="min-h-screen flex items-center py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={solutionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nuestra Solución
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un enfoque integral que transforma completamente la operación del negocio
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={solutionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-12 items-center mb-16"
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Antes</h3>
                <div className="space-y-4">
                  {['Procesos manuales lentos', 'Comunicación fragmentada', 'Datos dispersos', 'Alto margen de error'].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Después</h3>
                <div className="space-y-4">
                  {['Automatización inteligente', 'Colaboración fluida', 'Información centralizada', 'Precisión garantizada'].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-3 text-gray-900 font-medium"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={solutionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-r from-blue-600 to-green-500 p-1 rounded-3xl"
            >
              <div className="bg-white p-10 rounded-3xl">
                <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  Impacto Medible
                </h3>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {[
                    { value: '75%', label: 'Reducción en tiempo de proceso' },
                    { value: '3x', label: 'Incremento en productividad' },
                    { value: '95%', label: 'Satisfacción del equipo' }
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={solutionInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                    >
                      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="qr" ref={qrRef} className="min-h-screen flex items-center py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={qrInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Crees que nuestra solución es el camino correcto?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Tu opinión es fundamental para seguir mejorando
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={qrInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 inline-block"
            >
              <motion.div
                initial={{ rotate: -5 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-6"
              >
                <QRCodeSVG
                  value={currentUrl}
                  size={280}
                  level="H"
                  includeMargin={true}
                  className="mx-auto"
                />
              </motion.div>

              <div className="space-y-4">
                <p className="text-2xl font-semibold text-gray-900">
                  Escanea y vota por nuestra presentación
                </p>
                <p className="text-gray-600">
                  Usa la cámara de tu dispositivo móvil para escanear el código QR
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={qrInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12"
            >
              <a
                href="/votar"
                className="inline-block bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                O vota directamente desde aquí
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Target className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-2xl font-bold mb-4">Gracias por tu atención</h3>
              <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                Estamos comprometidos con la excelencia y la innovación constante. Tu feedback nos ayuda a seguir mejorando.
              </p>
              <div className="flex justify-center gap-6 text-gray-400">
                <span>© 2025 Presentación Corporativa</span>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
