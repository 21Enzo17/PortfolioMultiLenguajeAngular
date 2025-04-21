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
}
