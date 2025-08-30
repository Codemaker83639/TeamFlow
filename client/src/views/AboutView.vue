<template>
  <div class="bg-dark-purple min-h-screen relative overflow-hidden" style="color: #FBE4D8;">
    <!-- Grid de fondo sutil -->
    <div class="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#8B5CF6" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Contenido principal -->
    <main class="relative z-10 min-h-screen flex items-center py-20">
      <div class="container mx-auto px-6">
        <div class="max-w-6xl mx-auto">
          
          <!-- Header con logo y título -->
          <div class="text-center mb-16 animate-fade-in">
            <div class="inline-flex items-center px-6 py-3 rounded-full bg-accent/10 border border-accent/30 mb-8">
              <div class="w-2 h-2 bg-accent rounded-full animate-pulse mr-3"></div>
              <span class="text-sm font-medium" style="color: #FBE4D8;">Conoce Nuestra Historia</span>
            </div>

            <div class="flex flex-col lg:flex-row items-center justify-center gap-6 mb-8">
              <div class="w-24 h-24 bg-accent/20 rounded-3xl flex items-center justify-center border border-accent/30 hover:scale-110 transition-transform duration-300">
                <svg class="w-12 h-12" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h1 class="text-6xl lg:text-7xl font-black leading-tight animate-slide-up" style="color: #FBE4D8;">
                Sobre <span style="color: #FBE4D8;">TeamFlow</span>
              </h1>
            </div>

            <p class="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed animate-slide-up animation-delay-200" style="color: #FBE4D8;">
              <strong>TeamFlow</strong> nació como un proyecto de tesis con la misión de resolver los desafíos de la gestión de proyectos en equipos remotos. Entendemos que la falta de visibilidad y las dificultades de coordinación pueden frenar hasta al equipo más talentoso.
            </p>
          </div>

          <!-- Grid de contenido principal -->
          <div class="grid lg:grid-cols-2 gap-12 mb-20">
            
            <!-- Nuestra Misión -->
            <div class="group animate-slide-up animation-delay-400">
              <div class="bg-primary/40 backdrop-blur-xl rounded-3xl p-8 border border-accent/20 shadow-2xl hover:scale-[1.02] transition-all duration-500 h-full">
                <!-- Header de la tarjeta -->
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 bg-accent rounded-full"></div>
                    <div class="w-3 h-3 bg-secondary rounded-full"></div>
                    <div class="w-3 h-3 bg-light-accent rounded-full"></div>
                  </div>
                  <div class="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                </div>

                <h2 class="text-3xl font-bold mb-6" style="color: #FBE4D8;">Nuestra Misión</h2>
                
                <p class="text-lg leading-relaxed mb-6" style="color: #FBE4D8;">
                  Ofrecer una plataforma intuitiva y poderosa que centralice la comunicación, el seguimiento de tareas y la medición de la productividad, permitiendo a los equipos distribuidos alcanzar su máximo potencial.
                </p>

                <!-- Características clave -->
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span class="text-sm" style="color: #FBE4D8;">Comunicación centralizada</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-secondary rounded-full animate-pulse animation-delay-200"></div>
                    <span class="text-sm" style="color: #FBE4D8;">Seguimiento en tiempo real</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-light-accent rounded-full animate-pulse animation-delay-400"></div>
                    <span class="text-sm" style="color: #FBE4D8;">Medición de productividad</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Los Creadores -->
            <div class="group animate-slide-up animation-delay-600">
              <div class="bg-primary/40 backdrop-blur-xl rounded-3xl p-8 border border-secondary/20 shadow-2xl hover:scale-[1.02] transition-all duration-500 h-full">
                <!-- Header de la tarjeta -->
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 bg-secondary rounded-full"></div>
                    <div class="w-3 h-3 bg-light-accent rounded-full"></div>
                    <div class="w-3 h-3 bg-accent rounded-full"></div>
                  </div>
                  <div class="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </div>

                <h2 class="text-3xl font-bold mb-6" style="color: #FBE4D8;">Los Creadores</h2>
                
                <p class="text-lg leading-relaxed mb-6" style="color: #FBE4D8;">
                  Este proyecto es desarrollado por <strong>Francisco Ogando</strong> y <strong>José Luis Galán</strong>, estudiantes de Ingeniería en Sistemas apasionados por la tecnología y la optimización de flujos de trabajo.
                </p>

                <!-- Avatares de los creadores -->
                <div class="flex items-center gap-4">
                  <div class="text-sm" style="color: #FBE4D8;">Desarrolladores:</div>
                  <div class="flex -space-x-2">
                    <div class="w-10 h-10 bg-accent rounded-full border-2 border-dark-purple flex items-center justify-center text-sm font-bold hover:scale-110 transition-transform duration-300" style="color: #FBE4D8;" title="Francisco Ogando">F</div>
                    <div class="w-10 h-10 bg-secondary rounded-full border-2 border-dark-purple flex items-center justify-center text-sm font-bold hover:scale-110 transition-transform duration-300" style="color: #FBE4D8;" title="José Luis Galán">J</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sección de estadísticas inspiracionales -->
          <div class="text-center mb-20 animate-slide-up animation-delay-800">
            <div class="inline-flex items-center px-6 py-3 rounded-full bg-secondary/20 border border-secondary/50 mb-8">
              <span class="text-base font-semibold" style="color: #FBE4D8;">Nuestro Impacto</span>
            </div>
            
            <h3 class="text-4xl font-bold mb-12" style="color: #FBE4D8;">
              Transformando el <span style="color: #FBE4D8;">Trabajo Remoto</span>
            </h3>

            <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <!-- Stat 1 -->
              <div class="text-center group">
                <div class="w-20 h-20 bg-accent/10 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                  <svg class="w-8 h-8" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold mb-2" style="color: #FBE4D8;">Innovación</h4>
                <p class="text-sm leading-relaxed" style="color: #FBE4D8;">Soluciones creativas para desafíos reales del trabajo remoto</p>
              </div>

              <!-- Stat 2 -->
              <div class="text-center group">
                <div class="w-20 h-20 bg-secondary/10 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                  <svg class="w-8 h-8" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold mb-2" style="color: #FBE4D8;">Colaboración</h4>
                <p class="text-sm leading-relaxed" style="color: #FBE4D8;">Conectando equipos dispersos en una sola plataforma</p>
              </div>

              <!-- Stat 3 -->
              <div class="text-center group">
                <div class="w-20 h-20 bg-light-accent/10 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                  <svg class="w-8 h-8" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-bold mb-2" style="color: #FBE4D8;">Crecimiento</h4>
                <p class="text-sm leading-relaxed" style="color: #FBE4D8;">Impulsando la productividad y el éxito de los equipos</p>
              </div>
            </div>
          </div>

          <!-- CTA de regreso con estilo moderno -->
          <div class="text-center animate-slide-up animation-delay-1000">
            <div class="max-w-2xl mx-auto mb-12">
              <h3 class="text-4xl font-bold mb-6" style="color: #FBE4D8;">
                ¿Listo para <span style="color: #FBE4D8;">Comenzar?</span>
              </h3>
              <p class="text-lg leading-relaxed" style="color: #FBE4D8;">
                Únete a los equipos que ya están transformando su forma de trabajar
              </p>
            </div>

            <!-- Botones de acción -->
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <RouterLink to="/login">
                <button class="group bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-accent/25">
                  <span class="flex items-center justify-center gap-2">
                    Iniciar Sesión
                    <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </div>
                  </span>
                </button>
              </RouterLink>

              <RouterLink to="/">
                <button class="group border-2 border-secondary hover:bg-secondary font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300" style="color: #FBE4D8;">
                  <span class="flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    Volver a Inicio
                  </span>
                </button>
              </RouterLink>
            </div>

            <!-- Trust indicators -->
            <div class="flex justify-center gap-8 mt-16">
              <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <div class="text-xs font-medium" style="color: #FBE4D8;">100% Seguro</div>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div class="text-xs font-medium" style="color: #FBE4D8;">Setup Rápido</div>
              </div>
              <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 bg-light-accent/10 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="#FBE4D8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z"></path>
                  </svg>
                </div>
                <div class="text-xs font-medium" style="color: #FBE4D8;">Soporte 24/7</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>

    <!-- Footer minimalista -->
    <footer class="relative z-10 border-t border-accent/20 py-8">
      <div class="container mx-auto px-6 text-center">
        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="w-8 h-0.5 bg-accent rounded-full"></div>
          <span class="font-medium text-sm" style="color: #FBE4D8;">TeamFlow</span>
          <div class="w-8 h-0.5 bg-accent rounded-full"></div>
        </div>
        <p class="text-xs" style="color: #FBE4D8;">&copy; 2025 TeamFlow. Transformando el trabajo remoto.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';

onMounted(() => {
  // Agregar clases de animación después del montaje
  const elements = document.querySelectorAll('[class*="animate-"]');
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.opacity = '1';
    }, index * 100);
  });
});
</script>

<style scoped>
/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}

/* Clases de animación */
.animate-fade-in { 
  animation: fadeIn 1s ease-out forwards; 
}

.animate-slide-up { 
  animation: slideUp 0.8s ease-out forwards; 
}

/* Delays para animaciones escalonadas */
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }
.animation-delay-1000 { animation-delay: 1s; }

/* Efectos de hover mejorados */
.group:hover .w-12 {
  transform: rotate(5deg) scale(1.1);
  transition: transform 0.3s ease;
}

/* Responsivo */
@media (max-width: 1024px) {
  .text-6xl { font-size: 3.5rem; }
  .text-7xl { font-size: 4rem; }
}

@media (max-width: 768px) {
  .text-6xl { font-size: 2.5rem; }
  .text-7xl { font-size: 3rem; }
  .text-4xl { font-size: 2rem; }
}
</style>