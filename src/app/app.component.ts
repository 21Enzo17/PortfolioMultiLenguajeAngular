import { Component, type OnInit, inject } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { CommonModule } from "@angular/common"
import { ThemeService } from "./services/theme.service"
import { LanguageService } from "./services/language.service"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div [class.dark]="isDarkTheme">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  isDarkTheme = false
  private themeService = inject(ThemeService)
  private languageService = inject(LanguageService)

  ngOnInit() {
    this.themeService.isDarkTheme$.subscribe((isDark) => {
      this.isDarkTheme = isDark
    })

    // Inicializar el idioma
    this.languageService.initLanguage()
  }
}
