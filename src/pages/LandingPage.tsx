import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, AlertCircle, CheckCircle, TrendingUp, Users, Clock, Target, Circle, X, Zap, BarChart3, FileX } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

function LandingPage() {
  const timelineRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const qrRef = useRef(null);
  const heroRef = useRef(null);

  const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' });
  const problemInView = useInView(problemRef, { once: true, margin: '-100px' });
  const solutionInView = useInView(solutionRef, { once: true, margin: '-100px' });
  const qrInView = useInView(qrRef, { once: true, margin: '-100px' });

  // Scroll animations
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // URL del deploy en Vercel
  const baseUrl = import.meta.env.VITE_APP_URL || 'https://bit-core.vercel.app';
  const currentUrl = baseUrl + '/votar';

  return (
    <div className="min-h-screen">
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-70"
        />
        
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 relative z-10 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2 
            }}
            className="mb-6"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <Target className="w-20 h-20 mx-auto text-blue-600 mb-6" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transformando Desafíos en
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 block md:inline"
            >
              {' '}Oportunidades
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Una solución innovadora que revoluciona la forma en que abordamos los problemas empresariales
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.7 
            }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(37, 99, 235, 0.4)',
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('problema')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3 group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10">Descubre Nuestra Historia</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
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

      <section id="timeline" ref={timelineRef} className="pt-0 pb-20 relative overflow-hidden">
        {/* Hero background overlay - continuando desde hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-70" />
        
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        
        <div className="container mx-auto px-6 pt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={timelineInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
            >
              <Clock className="w-16 h-16 mx-auto text-blue-600 mb-6" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Nuestro Viaje
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Una línea de tiempo que muestra cómo hemos evolucionado y crecido desde nuestros inicios
            </motion.p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {/* Línea vertical central con gradiente - solo en desktop */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 via-purple-500 via-pink-500 via-red-500 to-orange-500 hidden md:block" />

              {/* Línea vertical para móvil */}
              <div className="absolute left-6 w-1 h-full bg-gradient-to-b from-blue-600 via-purple-500 via-pink-500 via-red-500 to-orange-500 md:hidden" />

              <div className="space-y-12 md:space-y-16">
                {[
                  {
                    year: '2018',
                    color: 'from-blue-600 to-blue-700',
                    events: [
                      { month: 'OCTUBRE', items: ['Fundación de BitCore y desarrollo del primer producto: BitFactura', 'Instalación de la primera oficina en Córdoba Capital'] }
                    ]
                  },
                  {
                    year: '2019',
                    color: 'from-blue-600 to-blue-700',
                    events: [
                      { month: 'MAYO', items: ['Contrato firmado con el primer cliente retail', 'Lanzamiento oficial de BitFactura versión 1.0'] },
                      { month: 'NOVIEMBRE', items: ['Inicio del desarrollo de BitStock (gestión de inventario)'] }
                    ]
                  },
                  {
                    year: '2020',
                    color: 'from-purple-600 to-purple-700',
                    events: [
                      { month: 'ABRIL', items: ['Lanzamiento de BitRH, software de gestión de recursos humanos'] },
                      { month: 'AGOSTO', items: ['Primera integración piloto con sistemas contables externos'] },
                      { month: 'NOVIEMBRE', items: ['Creación de un equipo dedicado de UX/UI'] }
                    ]
                  },
                  {
                    year: '2021',
                    color: 'from-pink-500 to-pink-600',
                    events: [
                      { month: 'MAYO', items: ['BitFactura alcanza 100 usuarios activos'] },
                      { month: 'JUNIO', items: ['Lanzamiento de demo web interactiva para clientes potenciales'] },
                      { month: 'JULIO', items: ['Migración total de productos a la nube'] },
                      { month: 'NOVIEMBRE', items: ['Implementación de sistema de soporte técnico vía ticketing'] }
                    ]
                  },
                  {
                    year: '2022',
                    color: 'from-pink-500 to-pink-600',
                    events: [
                      { month: 'JUNIO', items: ['Alianza con instituto de formación profesional para capacitación conjunta', 'Apertura del showroom para presentaciones comerciales'] },
                      { month: 'NOVIEMBRE', items: ['Lanzamiento de BitCore Suite 2.0 con interfaz unificada'] },
                      { month: 'DICIEMBRE', items: ['BitCore alcanza 50 clientes empresariales activos'] }
                    ]
                  },
                  {
                    year: '2023',
                    color: 'from-red-500 to-red-600',
                    events: [
                      { month: 'ABRIL', items: ['Inicio de desarrollos con integración API para marketplaces', 'Nuevas funciones para control de stock y alertas automatizadas'] },
                      { month: 'AGOSTO', items: ['Implementación de reportes analíticos y Business Intelligence (BI)'] },
                      { month: 'SEPTIEMBRE', items: ['BitCore participa en su primera feria tecnológica nacional'] }
                    ]
                  },
                  {
                    year: '2024',
                    color: 'from-orange-500 to-orange-600',
                    events: [
                      { month: 'FEBRERO', items: ['Lanzamiento del Centro de Ayuda Online para usuarios', 'Nuevo sistema de documentación técnica autogenerada'] },
                      { month: 'AGOSTO', items: ['Implementación de módulo de inteligencia artificial para predicción de demanda', 'BitCore alcanza 100 clientes activos a nivel nacional'] },
                      { month: 'DICIEMBRE', items: ['Planificación de expansión a países vecinos en 2025', 'Inicio de certificación bajo estándar ISO 27001'] }
                    ]
                  },
                  {
                    year: '2025',
                    color: 'from-emerald-500 to-emerald-600',
                    events: [
                      { month: 'PRÓXIMAMENTE', items: ['Expansión internacional a países vecinos', 'Certificación ISO 27001 completada', 'Nuevas funcionalidades y mejoras continuas'] }
                    ],
                    isFuture: true
                  }
                ].map((milestone, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={timelineInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: idx * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="relative"
                  >
                    {/* Versión Desktop: alternando izquierda/derecha */}
                    <div className={`hidden md:flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-start gap-8 md:gap-12`}>
                      <div className="flex-1">
                        <motion.div
                          initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                          animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.6, delay: idx * 0.15 + 0.2 }}
                          whileHover={{ scale: 1.03, y: -8, boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
                          className={`bg-gradient-to-br ${milestone.color} p-6 md:p-8 rounded-2xl text-white shadow-xl border-2 border-white/20 ${milestone.isFuture ? 'opacity-90' : ''} relative overflow-hidden`}
                        >
                          {/* Animated background shimmer */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: "easeInOut"
                            }}
                          />
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-3xl md:text-4xl font-bold">{milestone.year}</h3>
                              {milestone.isFuture && (
                                <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-semibold">
                                  PRÓXIMO
                                </span>
                              )}
                            </div>
                            
                            <div className="space-y-6">
                              {milestone.events.map((event, eventIdx) => (
                                <div key={eventIdx} className="border-l-2 border-white/30 pl-4">
                                  <h4 className="text-lg md:text-xl font-semibold mb-3 text-white/95">
                                    {event.month}
                                  </h4>
                                  <ul className="space-y-2">
                                    {event.items.map((item, itemIdx) => (
                                      <motion.li
                                        key={itemIdx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.4, delay: idx * 0.15 + eventIdx * 0.1 + itemIdx * 0.05 }}
                                        className="flex items-start gap-2 text-white/90 text-sm md:text-base"
                                      >
                                        <Circle className="w-2 h-2 fill-current mt-2 flex-shrink-0" />
                                        <span className="leading-relaxed">{item}</span>
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={timelineInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ 
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: idx * 0.15 + 0.1 
                        }}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${milestone.color} border-4 border-white shadow-xl items-center justify-center flex-shrink-0 z-10 flex`}
                      >
                        <Circle className="w-8 h-8 text-white fill-white" />
                      </motion.div>

                      <div className="flex-1" />
                    </div>

                    {/* Versión Móvil: siempre a la derecha */}
                    <div className="md:hidden flex items-start gap-4 pl-12">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={timelineInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: idx * 0.15 + 0.1 }}
                        className={`absolute left-4 w-8 h-8 rounded-full bg-gradient-to-br ${milestone.color} border-4 border-white shadow-xl items-center justify-center flex-shrink-0 z-10 flex`}
                      >
                        <Circle className="w-4 h-4 text-white fill-white" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className={`bg-gradient-to-br ${milestone.color} p-5 rounded-xl text-white shadow-lg border-2 border-white/20 ${milestone.isFuture ? 'opacity-90' : ''}`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold">{milestone.year}</h3>
                            {milestone.isFuture && (
                              <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-semibold">
                                PRÓXIMO
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            {milestone.events.map((event, eventIdx) => (
                              <div key={eventIdx} className="border-l-2 border-white/30 pl-3">
                                <h4 className="text-base font-semibold mb-2 text-white/95">
                                  {event.month}
                                </h4>
                                <ul className="space-y-1.5">
                                  {event.items.map((item, itemIdx) => (
                                    <motion.li
                                      key={itemIdx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                                      transition={{ duration: 0.4, delay: idx * 0.15 + eventIdx * 0.1 + itemIdx * 0.05 }}
                                      className="flex items-start gap-2 text-white/90 text-sm"
                                    >
                                      <Circle className="w-1.5 h-1.5 fill-current mt-1.5 flex-shrink-0" />
                                      <span className="leading-relaxed">{item}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problema" ref={problemRef} className="pt-0 pb-20 relative overflow-hidden">
        {/* Hero background overlay - continuando desde hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-70" />
        
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        
        {/* Additional decorative elements for problem section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={problemInView ? { opacity: 0.15, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={problemInView ? { opacity: 0.15, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />

        <div className="container mx-auto px-6 pt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={problemInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
            >
              <AlertCircle className="w-16 h-16 mx-auto text-orange-500 mb-6" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              La Problemática
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Un desafío que estaba limitando el crecimiento y la eficiencia de la organización
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              { 
                icon: Clock, 
                title: 'Pérdida de Tiempo', 
                description: 'Los procesos manuales consumían horas valiosas del equipo',
                color: 'from-orange-500 to-orange-600',
                bgColor: 'from-orange-50 to-orange-100/50',
                delay: 0.2,
                stats: '40+ horas/semana'
              },
              { 
                icon: Users, 
                title: 'Falta de Coordinación', 
                description: 'La comunicación entre departamentos era ineficiente',
                color: 'from-red-500 to-red-600',
                bgColor: 'from-red-50 to-red-100/50',
                delay: 0.4,
                stats: '60% ineficiencia'
              },
              { 
                icon: TrendingUp, 
                title: 'Crecimiento Limitado', 
                description: 'La escalabilidad del negocio estaba comprometida',
                color: 'from-amber-500 to-amber-600',
                bgColor: 'from-amber-50 to-amber-100/50',
                delay: 0.6,
                stats: '30% pérdida'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={problemInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: item.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  boxShadow: '0 25px 50px rgba(249, 115, 22, 0.2)',
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className={`bg-gradient-to-br ${item.bgColor} p-8 rounded-2xl shadow-xl border-2 border-orange-200/50 h-full transition-all duration-300 group-hover:border-orange-300`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={problemInView ? { scale: 1 } : {}}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: item.delay + 0.2
                    }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} mb-6 shadow-lg`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={problemInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: item.delay + 0.4 }}
                    className="flex items-center gap-2 text-sm font-semibold text-orange-600"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>{item.stats}</span>
                  </motion.div>

                  {/* Decorative element */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={problemInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.5, delay: item.delay + 0.3 }}
                    className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-xl`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional problem cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            {[
              {
                icon: FileX,
                title: 'Datos Desorganizados',
                description: 'Información dispersa en múltiples sistemas sin integración',
                delay: 0.8
              },
              {
                icon: Zap,
                title: 'Errores Frecuentes',
                description: 'Alto margen de error humano afectando la calidad del servicio',
                delay: 1.0
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={problemInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.6,
                  delay: item.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ x: index % 2 === 0 ? -5 : 5, scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <item.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={problemInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 1.2,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.02 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 p-1 rounded-3xl">
              <div className="bg-white p-10 rounded-3xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <X className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    El Resultado
                  </h3>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={problemInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="text-xl text-gray-700 text-center leading-relaxed"
                >
                  Una empresa <span className="font-bold text-orange-600">atrapada en operaciones ineficientes</span>, 
                  {' '}<span className="font-bold text-red-600">perdiendo oportunidades de mercado</span> y 
                  {' '}<span className="font-bold text-amber-600">enfrentando la frustración diaria de su equipo</span>.
                </motion.p>
              </div>
            </div>
            
            {/* Animated border effect */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0px rgba(249, 115, 22, 0)',
                  '0 0 30px rgba(249, 115, 22, 0.3)',
                  '0 0 0px rgba(249, 115, 22, 0)',
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-3xl pointer-events-none"
            />
          </motion.div>
        </div>
      </section>

      <section id="solucion" ref={solutionRef} className="min-h-screen flex items-center pt-0 pb-20 relative overflow-hidden">
        {/* Hero background overlay - continuando desde hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-70" />
        
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        
        {/* Additional decorative elements for solution section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={solutionInView ? { opacity: 0.15 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-20 right-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={solutionInView ? { opacity: 0.15 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />

        <div className="container mx-auto px-6 pt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={solutionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={solutionInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-6" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={solutionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Nuestra Solución
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={solutionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Un enfoque integral que transforma completamente la operación del negocio
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                animate={solutionInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.02, x: -5 }}
                className="bg-gradient-to-br from-red-50 to-orange-50 p-10 rounded-3xl border-2 border-red-200"
              >
                <div className="flex items-center gap-3 mb-8">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  <h3 className="text-3xl font-bold text-gray-900">Antes</h3>
                </div>
                <div className="space-y-4">
                  {['Procesos manuales lentos', 'Comunicación fragmentada', 'Datos dispersos', 'Alto margen de error', 'Equipo desmotivado', 'Crecimiento estancado'].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + idx * 0.08 }}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={solutionInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-3xl border-2 border-green-200"
              >
                <div className="flex items-center gap-3 mb-8">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <h3 className="text-3xl font-bold text-gray-900">Después</h3>
                </div>
                <div className="space-y-4">
                  {['Automatización inteligente', 'Colaboración fluida', 'Información centralizada', 'Precisión garantizada', 'Equipo motivado', 'Crecimiento exponencial'].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + idx * 0.08 }}
                      className="flex items-center gap-3 text-gray-900 font-medium"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={solutionInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.02, y: -5 }}
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

      <section id="qr" ref={qrRef} className="min-h-screen flex items-center pt-0 pb-20 relative overflow-hidden">
        {/* Hero background overlay - continuando desde hero */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-70" />
        
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        
        {/* Additional animated background for QR section */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />

        <div className="container mx-auto px-6 pt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={qrInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={qrInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              ¿Crees que nuestra solución es el camino correcto?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={qrInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-600 mb-12"
            >
              Tu opinión es fundamental para seguir mejorando
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={qrInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05, rotate: 2, y: -5 }}
              className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 inline-block relative overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-green-500/10 to-blue-500/10"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={qrInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.6
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={qrInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="space-y-4"
                >
                  <p className="text-2xl font-semibold text-gray-900">
                    Escanea y vota por nuestra presentación
                  </p>
                  <p className="text-gray-600">
                    Usa la cámara de tu dispositivo móvil para escanear el código QR
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={qrInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12"
            >
              <motion.a
                href="/votar"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10">O vota directamente desde aquí</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                <Target className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl font-bold mb-4"
              >
                Gracias por tu atención
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gray-400 max-w-2xl mx-auto mb-6"
              >
                Estamos comprometidos con la excelencia y la innovación constante. Tu feedback nos ayuda a seguir mejorando.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex justify-center gap-6 text-gray-400"
              >
                <span>© 2025 Presentación Corporativa</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
