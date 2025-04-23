import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Certificate {
  name: string;
  issuer: string;
  date: string;
}

interface Language {
  language: string;
  level: string;
}

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent implements OnInit {
  certificates: Certificate[] = [];
  languages: Language[] = [];
  
  constructor(private translateService: TranslateService) {}
  
  ngOnInit(): void {
    this.loadCertificationsData();
    
    this.translateService.onLangChange.subscribe(() => {
      this.loadCertificationsData();
    });
  }
  
  private loadCertificationsData(): void {
    this.translateService.get('certifications.certificates').subscribe((data: Certificate[]) => {
      this.certificates = data;
    });
    
    this.translateService.get('certifications.languages').subscribe((data: Language[]) => {
      this.languages = data;
    });
  }
}