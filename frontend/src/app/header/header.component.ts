import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormsModule, NgModel } from '@angular/forms';




@Component({
  selector: 'app-header',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchTerm: string = '';
  adminname:string='';

  constructor(private searchService: SearchService) {}
  ngOnInit(): void {
    if(!this.adminname){
      this.adminname= localStorage.getItem('AdminName') || "";}
    
  }

  onSearchChange() {
    this.searchService.setSearchTerm(this.searchTerm);
  }

}
