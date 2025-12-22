import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Zap, 
  Shield, 
  Star,
  ChevronRight,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react'

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentModel, setCurrentModel] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    modelo: ''
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const openModal = (modelo) => {
    setCurrentModel(modelo)
    setCurrentImageIndex(0)
    setModalOpen(true)
    document.body.style.overflow = 'hidden' // Prevenir scroll del body
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentModel(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    if (currentModel && currentImageIndex < currentModel.imagenes.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [modalOpen])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const modelos = [
    {
      nombre: "Mercedes-AMG G 63",
      imagen: "/AMG G 63.jpg",
      imagenes: ["/AMG G 63.jpg"], // Puedes agregar más imágenes aquí
      aceleracion: "4.5s",
      potencia: "585 HP",
      motor: "V8 Biturbo"
    },
    {
      nombre: "Mercedes-AMG GT",
      imagen: "/AMG GT.jpg",
      imagenes: ["/AMG GT.jpg"], // Puedes agregar más imágenes aquí
      aceleracion: "3.2s",
      potencia: "630 HP",
      motor: "V8 Biturbo"
    },
    {
      nombre: "Mercedes-Benz EQS",
      imagen: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80",
      imagenes: ["https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80"], // Puedes agregar más imágenes aquí
      aceleracion: "4.3s",
      potencia: "523 HP",
      motor: "Eléctrico"
    }
  ]

  const seminuevos = [
    {
      nombre: "Mercedes-Benz GLE 450",
      año: "2022",
      imagen: "/GLE 450.jpg",
      imagenes: ["/GLE 450.jpg"], // Puedes agregar más imágenes aquí
      kilometraje: "15,000 km",
      precio: "Consultar",
      motor: "Turbo 3.0L"
    },
    {
      nombre: "Mercedes-AMG C 63 S",
      año: "2021",
      imagen: "/AMG C 63 S.jpg",
      imagenes: ["/AMG C 63 S.jpg"], // Puedes agregar más imágenes aquí
      kilometraje: "22,000 km",
      precio: "Consultar",
      motor: "V8 Biturbo"
    },
    {
      nombre: "Mercedes-Benz S 500",
      año: "2023",
      imagen: "/S 500.jpg",
      imagenes: ["/S 500.jpg"], // Puedes agregar más imágenes aquí
      kilometraje: "8,500 km",
      precio: "Consultar",
      motor: "Turbo 3.0L"
    }
  ]

  const testimonios = [
    {
      nombre: "Carlos Mendoza",
      ubicacion: "Cancún",
      texto: "Alex no solo me vendió un Mercedes, me brindó una experiencia de lujo incomparable. Atención personalizada de principio a fin.",
      modelo: "AMG G 63"
    },
    {
      nombre: "María Fernández",
      ubicacion: "Playa del Carmen",
      texto: "La entrega VIP a domicilio fue espectacular. Alex se encargó de cada detalle, incluidos los trámites que suelen ser complicados.",
      modelo: "EQS 450+"
    },
    {
      nombre: "Roberto Jiménez",
      ubicacion: "Tulum",
      texto: "Disponibilidad 24/7 real. Cuando tuve dudas sobre las funciones, Alex estuvo ahí para resolverlas de inmediato.",
      modelo: "AMG GT"
    }
  ]

  const servicios = [
    {
      icon: <Shield className="w-8 h-8" />,
      titulo: "Entrega VIP a Domicilio",
      descripcion: "Tu Mercedes llega a tu puerta en Cancún o Riviera Maya con presentación de concierge."
    },
    {
      icon: <Award className="w-8 h-8" />,
      titulo: "Gestión Premium de Trámites",
      descripcion: "Olvídate del papeleo. Yo me encargo de placas, seguros y toda la documentación."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      titulo: "Atención 24/7 Personalizada",
      descripcion: "Disponible cuando me necesites. Tu satisfacción es mi compromiso de por vida."
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const mensaje = `Hola Alex, soy ${formData.nombre}. Estoy interesado en el ${formData.modelo}. Mi WhatsApp: ${formData.whatsapp}`
    const whatsappUrl = `https://wa.me/525545229987?text=${encodeURIComponent(mensaje)}`
    window.open(whatsappUrl, '_blank')
    
    // Limpiar formulario después de enviar
    setFormData({
      nombre: '',
      whatsapp: '',
      modelo: ''
    })
  }

  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 glass border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-3">
              <button 
                onClick={scrollToTop}
                className="font-serif text-3xl md:text-4xl font-bold tracking-tight transition-colors cursor-pointer group"
              >
                <span className="text-white group-hover:text-[#C0C0C0] transition-colors">Alex Rosete</span>
                <span className="text-[#C0C0C0] group-hover:text-white transition-colors"> | Mercedes-Benz</span>
              </button>
              {/* Mercedes-Benz Logo */}
              <img 
                src="/Logo MBZ.png" 
                alt="Mercedes-Benz Logo" 
                className="w-10 h-10 md:w-14 md:h-14 object-contain"
              />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#modelos" className="text-lg hover:text-[#C0C0C0] transition-colors">Modelos</a>
              <a href="#servicios" className="text-lg hover:text-[#C0C0C0] transition-colors">Servicios</a>
              <a href="#contacto" className="text-lg hover:text-[#C0C0C0] transition-colors">Contacto</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col space-y-4 text-lg">
                <a href="#modelos" onClick={() => setIsMenuOpen(false)} className="hover:text-[#C0C0C0] transition-colors">Modelos</a>
                <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="hover:text-[#C0C0C0] transition-colors">Servicios</a>
                <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="hover:text-[#C0C0C0] transition-colors">Contacto</a>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video/Image Background */}
        <div className="absolute inset-0">
          {!videoError ? (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=80"
            >
              <source src="https://player.vimeo.com/external/371433846.hd.mp4?s=1f686d03f47c9f88b1d06f8c8f88c5c7e8a13c5e&profile_id=175" type="video/mp4" />
              <source src="https://cdn.coverr.co/videos/coverr-black-mercedes-benz-car-3735/1080p.mp4" type="video/mp4" />
            </video>
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=80"
              alt="Mercedes AMG"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ 
              scale: 1.05,
              y: -8,
              textShadow: "0 0 30px rgba(192, 192, 192, 0.8), 0 0 60px rgba(255, 255, 255, 0.5)",
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight cursor-pointer"
            style={{
              textShadow: "0 0 0px transparent"
            }}
          >
            Alex Rosete
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#C0C0C0] mb-4"
          >
            Experiencias de Manejo Extraordinarias
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 mb-12 italic"
          >
            La ingeniería alemana se encuentra con el paraíso del Caribe
          </motion.p>
          <motion.a
            href="#contacto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="inline-flex items-center gap-2 glass px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-all group"
          >
            Agenda tu Cita Privada
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* El Estándar Alex Rosete */}
      <section id="servicios" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              El Estándar Alex Rosete
            </h2>
            <p className="text-[#C0C0C0] text-xl max-w-2xl mx-auto">
              Un servicio de concierge privado que redefine la adquisición de vehículos de lujo
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {servicios.map((servicio, index) => {
              // Diferentes estilos para cada cuadro usando los colores de la marca
              const estilos = [
                // Cuadro 1: Borde plateado con fondo oscuro
                "bg-white/5 border-2 border-[#C0C0C0] hover:bg-white/10 hover:border-white",
                // Cuadro 2: Fondo plateado suave con texto oscuro
                "bg-[#C0C0C0]/10 border-2 border-white/20 hover:bg-[#C0C0C0]/20 hover:border-[#C0C0C0]",
                // Cuadro 3: Combinación con acento plateado
                "bg-gradient-to-br from-white/10 to-[#C0C0C0]/10 border-2 border-white/30 hover:from-white/15 hover:to-[#C0C0C0]/20 hover:border-white"
              ]
              
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`${estilos[index]} p-8 rounded-2xl transition-all duration-300 group`}
                >
                  <div className="text-[#C0C0C0] mb-6 group-hover:text-white transition-colors drop-shadow-[0_0_10px_rgba(192,192,192,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                    {servicio.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-4">{servicio.titulo}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed">{servicio.descripcion}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Mi Selección Exclusiva */}
      <section id="modelos" className="py-24 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Mi Selección Exclusiva
            </h2>
            <p className="text-[#C0C0C0] text-xl max-w-2xl mx-auto">
              Modelos curados personalmente para el conductor más exigente
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {modelos.map((modelo, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-500"
              >
                <div 
                  className="relative h-64 overflow-hidden cursor-pointer"
                  onClick={() => openModal(modelo)}
                >
                  <img 
                    src={modelo.imagen} 
                    alt={modelo.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold mb-6">{modelo.nombre}</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <Zap className="w-5 h-5 text-[#C0C0C0] mx-auto mb-2" />
                      <p className="text-sm text-gray-400">0-100 km/h</p>
                      <p className="font-bold">{modelo.aceleracion}</p>
                    </div>
                    <div className="text-center">
                      <Award className="w-5 h-5 text-[#C0C0C0] mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Potencia</p>
                      <p className="font-bold">{modelo.potencia}</p>
                    </div>
                    <div className="text-center">
                      <Shield className="w-5 h-5 text-[#C0C0C0] mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Motor</p>
                      <p className="font-bold text-xs">{modelo.motor}</p>
                    </div>
                  </div>
                  <a
                    href="#contacto"
                    className="w-full block text-center glass py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
                  >
                    Solicitar Información
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seminuevos Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Seminuevos Certificados
            </h2>
            <p className="text-[#C0C0C0] text-xl max-w-2xl mx-auto">
              Vehículos premium con la garantía y el servicio Alex Rosete
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {seminuevos.map((vehiculo, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-500"
              >
                <div 
                  className="relative h-64 overflow-hidden cursor-pointer"
                  onClick={() => openModal(vehiculo)}
                >
                  <img 
                    src={vehiculo.imagen} 
                    alt={vehiculo.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badge de Promoción - Solo para S 500 */}
                  {vehiculo.nombre === "Mercedes-Benz S 500" && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="relative">
                        {/* Badge principal con glassmorphism */}
                        <div 
                          className="bg-gradient-to-br from-[#C0C0C0] to-white px-2 py-1 rounded-md border border-white shadow-xl"
                          style={{
                            backdropFilter: "blur(8px)",
                            boxShadow: "0 0 15px rgba(192, 192, 192, 0.5), 0 0 30px rgba(255, 255, 255, 0.2)"
                          }}
                        >
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-[#0A0A0A] text-[#0A0A0A] animate-pulse" />
                            <div className="text-center leading-none">
                              <p className="text-[#0A0A0A] font-black text-sm">-15%</p>
                            </div>
                          </div>
                        </div>
                        {/* Efecto de brillo/pulsación */}
                        <div className="absolute inset-0 rounded-md bg-white/20 animate-ping" style={{ animationDuration: "2s" }}></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 bg-[#C0C0C0] text-black px-4 py-2 rounded-full font-bold text-sm">
                    {vehiculo.año}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold mb-6">{vehiculo.nombre}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-gray-400">Año</span>
                      <span className="font-bold">{vehiculo.año}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-gray-400">Kilometraje</span>
                      <span className="font-bold">{vehiculo.kilometraje}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-gray-400">Motor</span>
                      <span className="font-bold">{vehiculo.motor}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-400">Precio</span>
                      <span className="font-bold text-[#C0C0C0] text-lg">{vehiculo.precio}</span>
                    </div>
                  </div>
                  <a
                    href="#contacto"
                    className="w-full block text-center glass py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
                  >
                    Solicitar Información
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-6">
              ¿Buscas un modelo específico? Contáctame para acceder a mi inventario exclusivo
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 glass px-8 py-4 rounded-full hover:bg-white/10 transition-all group"
            >
              Ver Más Seminuevos
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-24 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Experiencias Reales
            </h2>
            <p className="text-[#C0C0C0] text-xl">
              Testimonios de clientes que confiaron en el estándar Alex Rosete
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonios.map((testimonio, index) => {
              // Diferentes estilos para cada testimonio
              const estilos = [
                // Testimonio 1: Borde plateado con fondo oscuro
                "bg-white/5 border-2 border-[#C0C0C0]/60 hover:bg-white/10 hover:border-[#C0C0C0] transition-all duration-300",
                // Testimonio 2: Fondo plateado suave
                "bg-[#C0C0C0]/10 border-2 border-white/30 hover:bg-[#C0C0C0]/15 hover:border-white/50 transition-all duration-300",
                // Testimonio 3: Degradado con acento
                "bg-white/5 border-2 border-[#C0C0C0]/50 hover:bg-white/10 hover:border-white/60 transition-all duration-300"
              ]
              
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`${estilos[index]} p-8 rounded-2xl`}
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-6 h-6 fill-[#C0C0C0] text-[#C0C0C0] drop-shadow-[0_0_8px_rgba(192,192,192,0.6)]"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic leading-relaxed">
                    &ldquo;{testimonio.texto}&rdquo;
                  </p>
                  <div className="border-t border-white/20 pt-4 flex items-center gap-4">
                    {/* Cuadro redondeado para foto del usuario */}
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#C0C0C0] to-white/30 flex items-center justify-center text-black font-bold text-2xl flex-shrink-0 border-2 border-white/40">
                      {testimonio.nombre.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white">{testimonio.nombre}</p>
                      <p className="text-sm text-[#C0C0C0]">{testimonio.ubicacion}</p>
                      <p className="text-sm text-white font-semibold mt-1 bg-white/10 inline-block px-3 py-1 rounded-full">
                        {testimonio.modelo}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Agenda tu Cita Personalizada
              </h2>
              <p className="text-[#C0C0C0] text-xl mb-8 leading-relaxed">
                Permíteme guiarte en la adquisición de tu próximo Mercedes-Benz. 
                Una conversación privada sin compromisos para entender tus necesidades.
              </p>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/525545229987?text=Hola%20Alex,%20vi%20tu%20landing%20page%20y%20me%20gustaría%20recibir%20información%20sobre%20un%20Mercedes-Benz."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 hover:text-[#C0C0C0] transition-colors"
                >
                  <Phone className="w-6 h-6 text-[#C0C0C0]" />
                  <span>+52 55 4522 9987</span>
                </a>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-[#C0C0C0]" />
                  <span>mbfpdc@prestigemotors.com.mx</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-[#C0C0C0]" />
                  <span>Disponible 24/7 para ti</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              className="glass p-8 rounded-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#C0C0C0] transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#C0C0C0] transition-colors"
                    placeholder="+52 999 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Modelo de Interés</label>
                  <select
                    required
                    value={formData.modelo}
                    onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[#C0C0C0] transition-colors text-white"
                  >
                    <option value="" className="bg-white text-black">Selecciona un modelo</option>
                    <option value="Mercedes-AMG G 63" className="bg-white text-black">Mercedes-AMG G 63</option>
                    <option value="Mercedes-AMG GT" className="bg-white text-black">Mercedes-AMG GT</option>
                    <option value="Mercedes-Benz EQS" className="bg-white text-black">Mercedes-Benz EQS</option>
                    <option value="Seminuevos" className="bg-white text-black">Seminuevos Certificados</option>
                    <option value="Otro modelo" className="bg-white text-black">Otro modelo</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C0C0C0] text-black font-bold py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 group"
                >
                  Agendar Cita Personalizada
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-serif text-2xl font-bold mb-2">Alex Rosete</p>
          <p className="text-[#C0C0C0] mb-4">Gerente de Financiera | Mercedes-Benz</p>
          <p className="text-sm text-gray-500 italic">
            Cancún & Riviera Maya | © {new Date().getFullYear()} Todos los derechos reservados
          </p>
        </div>
      </footer>

      {/* Modal Estilo Instagram */}
      <AnimatePresence>
        {modalOpen && currentModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
            >
              {/* Botón Cerrar */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-[#C0C0C0] transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Contenedor de Imagen */}
              <div className="relative bg-black rounded-lg overflow-hidden">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={currentModel.imagenes[currentImageIndex]}
                  alt={currentModel.nombre}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />

                {/* Botones de Navegación */}
                {currentModel.imagenes.length > 1 && (
                  <>
                    {/* Botón Anterior */}
                    {currentImageIndex > 0 && (
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                    )}

                    {/* Botón Siguiente */}
                    {currentImageIndex < currentModel.imagenes.length - 1 && (
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    )}

                    {/* Indicadores de Posición */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {currentModel.imagenes.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex 
                              ? 'bg-white w-8' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Información del Modelo */}
              <div className="mt-4 text-white">
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                  {currentModel.nombre}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm md:text-base">
                  {currentModel.aceleracion && (
                    <span className="text-[#C0C0C0]">
                      0-100: {currentModel.aceleracion}
                    </span>
                  )}
                  {currentModel.potencia && (
                    <span className="text-[#C0C0C0]">
                      {currentModel.potencia}
                    </span>
                  )}
                  {currentModel.motor && (
                    <span className="text-[#C0C0C0]">
                      {currentModel.motor}
                    </span>
                  )}
                  {currentModel.año && (
                    <span className="text-[#C0C0C0]">
                      Año: {currentModel.año}
                    </span>
                  )}
                  {currentModel.kilometraje && (
                    <span className="text-[#C0C0C0]">
                      {currentModel.kilometraje}
                    </span>
                  )}
                </div>
                {currentModel.imagenes.length > 1 && (
                  <p className="text-gray-400 text-sm mt-2">
                    {currentImageIndex + 1} / {currentModel.imagenes.length}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button - Premium Glassmorphism */}
      <motion.a
        href="https://wa.me/525545229987?text=Hola%20Alex,%20vi%20tu%20landing%20page%20y%20me%20gustaría%20recibir%20información%20sobre%20un%20Mercedes-Benz."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          delay: 1, 
          duration: 0.4,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        whileHover={{ 
          scale: 1.15,
          boxShadow: "0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(192, 192, 192, 0.4)",
          transition: { duration: 0.15 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.05 }
        }}
        className="fixed bottom-8 right-8 z-50 p-5 rounded-full group"
        style={{
          background: "linear-gradient(135deg, rgba(192, 192, 192, 0.4), rgba(255, 255, 255, 0.2))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(192, 192, 192, 0.3)"
        }}
      >
        <Phone className="w-7 h-7 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
      </motion.a>

    </div>
  )
}

export default LandingPage
