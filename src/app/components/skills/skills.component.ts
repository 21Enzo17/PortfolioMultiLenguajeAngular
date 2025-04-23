import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TranslateModule } from "@ngx-translate/core"

interface Skill {
  name: string;
}

@Component({
  selector: "app-skills",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillsComponent {
  // Iconos para las tecnologías (usando colecciones disponibles)
  techIcons: Record<string, Record<string, string>> = {
    frontend: {
      HTML5: "logos:html-5",
      CSS3: "logos:css-3",
      JavaScript: "logos:javascript",
      TypeScript: "logos:typescript-icon",
      Vue: "logos:vue",
      Angular: "logos:angular-icon",
      React: "logos:react",
      TailwindCSS: "vscode-icons:file-type-tailwind",
      WordPress: "logos:wordpress-icon",
    },
    backend: {
      Java: "logos:java",
      Spring: "logos:spring-icon",
      "Node.js": "logos:nodejs-icon",
      Python: "logos:python",
      Genexus: "carbon:application",
      Express: "simple-icons:express",
    },
    databases: {
      MySQL: "logos:mysql",
      PostgreSQL: "logos:postgresql",
      MongoDB: "logos:mongodb-icon",
    },
    devops: {
      Git: "logos:git-icon",
      Docker: "logos:docker-icon",
      Linux: "logos:linux-tux",
      "VS Code": "logos:visual-studio-code",
      Terminal: "carbon:terminal",
      Redes: "carbon:network-4",
      Networks: "carbon:network-4",
    },
    soft: {
      "Trabajo en equipo": "carbon:group",
      "Teamwork": "carbon:group",
      "Comunicación": "carbon:chat",
      "Communication": "carbon:chat",
      "Resolución de problemas": "carbon:idea",
      "Problem Solving": "carbon:idea",
      "Gestión del tiempo": "carbon:time",
      "Time Management": "carbon:time",
      "Adaptabilidad": "carbon:change-catalog",
      "Adaptability": "carbon:change-catalog",
      "Aprendizaje continuo": "carbon:education",
      "Continuous Learning": "carbon:education"
    }
  }

  // Helper method to safely access icons
  getIcon(section: string, name: string, fallback: string): string {
    try {
      return this.techIcons[section][name] || fallback;
    } catch (e) {
      return fallback;
    }
  }
}
