import { Component, type ElementRef, ViewChild, type AfterViewInit, type OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TranslateModule } from "@ngx-translate/core"

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  @ViewChild("backToTopButton") backToTopButton!: ElementRef

  ngAfterViewInit() {
    // Asegurarse de que el botón tenga el evento onClick
    if (this.backToTopButton && this.backToTopButton.nativeElement) {
      this.backToTopButton.nativeElement.addEventListener("click", this.scrollToTop)
    }
  }

  // Método para volver arriba
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  ngOnDestroy() {
    // Limpiar el evento al destruir el componente
    if (this.backToTopButton && this.backToTopButton.nativeElement) {
      this.backToTopButton.nativeElement.removeEventListener("click", this.scrollToTop)
    }
  }
}
