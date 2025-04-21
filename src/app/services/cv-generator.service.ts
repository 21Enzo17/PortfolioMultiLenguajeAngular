import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class CvGeneratorService {

  constructor(private translateService: TranslateService) { }

  /**
   * Genera un CV en formato PDF basado en los datos del idioma actual
   * @returns Promise que se resuelve cuando el PDF se ha generado y descargado
   */
  async generateCV(): Promise<void> {
    // Crear un elemento HTML temporal para renderizar el CV
    const cvElement = document.createElement('div');
    cvElement.className = 'cv-container';
    cvElement.style.width = '210mm'; // Tamaño A4
    cvElement.style.padding = '15mm';
    cvElement.style.position = 'absolute';
    cvElement.style.left = '-9999px';
    cvElement.style.backgroundColor = 'white';
    cvElement.style.color = '#000';
    cvElement.style.fontFamily = 'Arial, sans-serif';
    
    // Obtener los datos del idioma actual
    const currentLang = this.translateService.currentLang;
    
    // Obtener los datos del CV
    const heroData = await this.translateService.get('hero').toPromise();
    const experienceData = await this.translateService.get('experience').toPromise();
    const skillsData = await this.translateService.get('skills').toPromise();
    const contactData = await this.translateService.get('footer.contact').toPromise();
    const projectsData = await this.translateService.get('projects').toPromise();
    
    // Construir el HTML del CV con un diseño plano y limpio, optimizado para lectura por IA
    cvElement.innerHTML = `
      <div style="max-width: 100%; margin: 0 auto; font-size: 12pt; line-height: 1.4;">
        <!-- Encabezado simple -->
        <div style="margin-bottom: 20px; border-bottom: 1px solid #000; padding-bottom: 10px;">
          <h1 style="margin: 0; font-size: 20pt;">Enzo Meneghini</h1>
          <h2 style="margin: 5px 0 0 0; font-size: 14pt; font-weight: normal;">Full Stack Developer</h2>
        </div>
        
        <!-- Información de contacto -->
        <div style="margin-bottom: 20px;">
          <p style="margin: 0;">${contactData.location}</p>
          <p style="margin: 0;">enzo.meneghini@example.com</p>
          <p style="margin: 0;">+54 388 123-4567</p>
          <p style="margin: 0;">linkedin.com/in/enzomeneghini</p>
        </div>
          
        <!-- Acerca de mí -->
        <div style="margin-bottom: 20px;">
          <h2 style="margin: 0 0 10px 0; font-size: 14pt;">
            ${currentLang === 'es' ? 'PERFIL' : 'PROFILE'}
          </h2>
          <p style="margin: 0;">${heroData.bio.replace(/<[^>]*>/g, '')}</p>
        </div>

        <!-- Experiencia laboral -->
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <h2 style="margin: 0 0 10px 0; font-size: 14pt; border-bottom: 1px solid #000; padding-bottom: 5px;">
            ${experienceData.title.toUpperCase()}
          </h2>
          ${this.generateExperienceHTML(experienceData.items)}
        </div>

        <!-- Habilidades -->
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <h2 style="margin: 0 0 10px 0; font-size: 14pt; border-bottom: 1px solid #000; padding-bottom: 5px;">
            ${skillsData.title.toUpperCase()}
          </h2>
          ${this.generateSkillsHTML(skillsData)}
        </div>

        <!-- Proyectos Destacados -->
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <h2 style="margin: 0 0 10px 0; font-size: 14pt; border-bottom: 1px solid #000; padding-bottom: 5px;">
            ${projectsData.title.toUpperCase()}
          </h2>
          ${this.generateProjectsHTML(projectsData.items)}
        </div>
      </div>
    `;
    
    // Añadir el elemento al DOM para renderizarlo
    document.body.appendChild(cvElement);
    
    try {
      // Generar PDF directamente de contenido HTML con paginación mejorada
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      // Configuración para HTML2Canvas
      const options = {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      };
      
      // Obtener dimensiones de A4 en puntos
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Convertir HTML a canvas
      const canvas = await html2canvas(cvElement, options);
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Calcular el número de páginas necesarias
      const imgWidth = pageWidth;
      const imgHeight = canvas.height * pageWidth / canvas.width;
      
      // Agregar imagen página por página
      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 0;
      
      while (heightLeft > 0) {
        if (pageNumber > 0) {
          // Añadir nueva página si no es la primera
          pdf.addPage();
        }
        
        // Calcular la parte de la imagen que va en esta página
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        
        // Preparar para la siguiente página
        heightLeft -= pageHeight;
        position -= pageHeight;
        pageNumber++;
      }
      
      // Guardar el PDF con un nombre descriptivo
      pdf.save(`CV_Enzo_Meneghini_${currentLang === 'es' ? 'ESP' : 'ENG'}.pdf`);
    } catch (error) {
      console.error('Error al generar el CV:', error);
    } finally {
      // Eliminar el elemento temporal
      document.body.removeChild(cvElement);
    }
  }
  
  /**
   * Genera el HTML para la sección de experiencia con un diseño plano
   */
  private generateExperienceHTML(experiences: any[]): string {
    if (!experiences || !experiences.length) {
      return '<p>No hay experiencia disponible.</p>';
    }
    
    return experiences.map(exp => {
      let html = `
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <div style="margin-bottom: 5px;">
            <div style="font-weight: bold;">${exp.jobTitle} | ${exp.company}</div>
            <div style="font-style: italic;">${exp.period} | ${exp.location}</div>
          </div>
      `;
      
      if (exp.sections && exp.sections.length) {
        html += exp.sections.map((section: any) => {
          let sectionHtml = `
            <div style="margin-top: 8px; page-break-inside: avoid;">
              <div style="font-weight: bold;">${section.title.replace(/^[💻🔧⚙️🤝]\s/, '')}</div>
          `;
          
          switch (section.type) {
            case 'projects':
              sectionHtml += '<div style="margin-left: 15px;">';
              sectionHtml += section.content.map((project: any) => {
                return `
                  <div style="margin-bottom: 5px;">
                    <div style="font-weight: bold;">${project.title}</div>
                    <ul style="margin: 3px 0; padding-left: 20px;">
                      ${project.descriptions.map((desc: string) => `<li>${desc.replace(/^- /, '')}</li>`).join('')}
                    </ul>
                  </div>
                `;
              }).join('');
              sectionHtml += '</div>';
              break;
            
            case 'list':
              sectionHtml += `
                <ul style="margin: 3px 0; padding-left: 20px;">
                  ${section.content.map((item: string) => `<li>${item}</li>`).join('')}
                </ul>
              `;
              break;
            
            case 'technologies':
              sectionHtml += `<p style="margin: 3px 0;">${section.content.join(', ')}</p>`;
              break;
              
            case 'text':
              sectionHtml += `
                <div style="margin: 3px 0;">
                  ${section.content.join('<br>')}
                </div>
              `;
              break;
          }
          
          sectionHtml += '</div>';
          return sectionHtml;
        }).join('');
      }
      
      html += '</div>';
      return html;
    }).join('');
  }
  
  /**
   * Genera el HTML para la sección de habilidades con un diseño plano
   */
  private generateSkillsHTML(skills: any): string {
    const categories = ['frontend', 'backend', 'databases', 'devops'];
    let html = '<div style="display: flex; flex-wrap: wrap;">';
    
    categories.forEach(category => {
      if (skills[category] && skills[category].items) {
        html += `
          <div style="width: 50%; padding-right: 10px; margin-bottom: 15px; page-break-inside: avoid;">
            <h3 style="margin: 0 0 5px 0; font-size: 12pt;">${skills[category].title}</h3>
            <p style="margin: 0;">
              ${skills[category].items.map((skill: any) => skill.name).join(', ')}
            </p>
          </div>
        `;
      }
    });
    
    html += '</div>';
    return html;
  }
  
  /**
   * Genera el HTML para la sección de proyectos con un diseño plano
   */
  private generateProjectsHTML(projects: any[]): string {
    if (!projects || !projects.length) {
      return '<p>No hay proyectos disponibles.</p>';
    }
    
    return `
      ${projects.map((project, index) => `
        <div style="margin-bottom: ${index === projects.length - 1 ? '0' : '15px'}; page-break-inside: avoid;">
          <h3 style="margin: 0 0 5px 0; font-size: 12pt;">${project.name}</h3>
          <p style="margin: 0 0 5px;">${project.description}</p>
          <p style="margin: 0; font-style: italic;">Tecnologías: ${project.technologies.join(', ')}</p>
        </div>
      `).join('')}
    `;
  }
}