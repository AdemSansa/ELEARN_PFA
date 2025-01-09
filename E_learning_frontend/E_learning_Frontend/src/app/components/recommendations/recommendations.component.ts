import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RecommandationService } from 'src/app/services/recommandation-service/recommandation.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  
  
  
    

    recommendedCourses :any [] = [];

    constructor(private recommendationService: RecommandationService) { }
  
    ngOnInit(): void {
      const user = { id: 1, preferences: ['programming', 'design'] }; // Example user data
      this.recommendationService.getRecommendations(user).subscribe(data => {
        this.recommendedCourses = data;
      });
    }
}
