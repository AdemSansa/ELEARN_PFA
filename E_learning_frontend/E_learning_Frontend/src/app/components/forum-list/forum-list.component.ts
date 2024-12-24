import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/services/forum-service/forum.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums: any[] = [];

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.forumService.getForums().subscribe((data) => {
      this.forums = data;
    });
  }
}
