import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TranslateModule, TranslateService } from "@ngx-translate/core"

// Interfaz para una sección genérica
interface ExperienceSection {
  type: string;        // Tipo de sección: 'projects', 'list', 'technologies', 'text', etc.
  title: string;       // Título de la sección
  icon?: string;       // Icono opcional (emoji o clase de icono)
  content: any;        // Contenido flexible según el tipo
}

// Interfaz para una experiencia laboral
interface Experience {
  jobTitle: string;
  company: string;
  period: string;
  location: string;
  sections: ExperienceSection[];  // Array de secciones personalizables
}

@Component({
  selector: "app-experience",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExperienceComponent {
  experiences: Experience[] = [];
  
  constructor(private translateService: TranslateService) {
    this.loadExperiences();
    
    // Subscribe to language changes to update experiences when language changes
    this.translateService.onLangChange.subscribe(() => {
      this.loadExperiences();
    });
  }
  
  private loadExperiences() {
    this.translateService.get('experience.items').subscribe((items: Experience[]) => {
      this.experiences = items;
    });
  }

  // Mapeo de tecnologías a íconos de Iconify (usando solo iconos que existen)
  techIcons: Record<string, string> = {
    Java: "logos:java",
    Angular: "logos:angular-icon",
    Genexus: "carbon:application",
    "Spring Boot": "logos:spring-icon",
    MySQL: "logos:mysql",
    "Node.js": "logos:nodejs-icon",
    "Redes LAN/WAN": "carbon:network-4",
    "LAN/WAN Networks": "carbon:network-4",
    HTML: "logos:html-5",
    HTML5: "logos:html-5",
    CSS: "logos:css-3",
    CSS3: "logos:css-3",
    JavaScript: "logos:javascript",
    Docker: "logos:docker-icon",
    GitHub: "mdi:github",
    Prometheus: "logos:prometheus",
    React: "logos:react",
    "Next.js": "logos:nextjs-icon",
    "Tailwind CSS": "logos:tailwindcss-icon",
    TailwindCSS: "vscode-icons:file-type-tailwind",
    WordPress: "logos:wordpress-icon"
  }
}
