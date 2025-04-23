import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TranslateModule, TranslateService } from "@ngx-translate/core"

interface Project {
  name: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
  downloadUrl?: string;
}

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectsComponent {
  projects: Project[] = [];
  
  // Iconos para tecnologías usadas en proyectos
  techIcons: Record<string, string> = {
    html5: "logos:html-5",
    css: "logos:css-3",
    javascript: "logos:javascript",
    typescript: "logos:typescript-icon",
    vue: "logos:vue",
    angular: "logos:angular-icon",
    react: "logos:react",
    tailwind: "vscode-icons:file-type-tailwind",
    wordpress: "logos:wordpress-icon",
    java: "logos:java",
    spring: "logos:spring-icon",
    nodejs: "logos:nodejs-icon",
    python: "logos:python",
    express: "simple-icons:express",
    mysql: "logos:mysql",
    postgresql: "logos:postgresql",
    mongodb: "logos:mongodb-icon",
    git: "logos:git-icon",
    docker: "logos:docker-icon",
    linux: "logos:linux-tux",
    vscode: "logos:visual-studio-code",
    // Nuevos iconos de ejemplo
    laravel: "logos:laravel",
    django: "vscode-icons:file-type-django",
    php: "logos:php",
    ruby: "logos:ruby",
    rails: "logos:rails",
    flutter: "logos:flutter",
    aws: "logos:aws",
    firebase: "logos:firebase",
    graphql: "logos:graphql",
    sass: "logos:sass",
    bootstrap: "logos:bootstrap",
    nuxt: "logos:nuxt-icon",
    next: "logos:nextjs-icon",
  };

  constructor(private translateService: TranslateService) {
    this.loadProjects();
    
    // Subscribe to language changes to update projects when language changes
    this.translateService.onLangChange.subscribe(() => {
      this.loadProjects();
    });
  }
  
  private loadProjects() {
    this.translateService.get('projects.items').subscribe((items: Project[]) => {
      this.projects = items;
    });
  }
  
  // Determina si un proyecto tiene una URL de documentación
  hasDocsUrl(project: Project): boolean {
    return !!project.docsUrl && project.docsUrl !== '#';
  }
  
  // Determina si un proyecto tiene una URL de demostración
  hasDemoUrl(project: Project): boolean {
    return !!project.demoUrl && project.demoUrl !== '#';
  }
  
  // Método para obtener el icono correcto para cada tecnología
  getTechIcon(tech: string): string {
    const techLower = tech.toLowerCase();
    return this.techIcons[techLower] || 'vscode-icons:file-type-default';
  }
}
