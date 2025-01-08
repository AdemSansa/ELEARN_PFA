import { ChangeDetectorRef, Component, OnInit, ɵɵsanitizeUrlOrResourceUrl } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ForumService } from 'src/app/services/forum-service/forum.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums: any[] = [];
  forum= { title: '', description: '',userUrl:'' };

  constructor(private forumService: ForumService,private AuthService:AuthService,     private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
    
    
    
    this.forumService.getForums().subscribe((data) => {
      this.forums = data;
    });

  }
  Isteacher()
  {
    
    return this.AuthService.getIsTeacher()
  }

 
  openCreateForumDialog() {
    Swal.fire({
      title: 'Create New Forum',
      html:`
    <input id="forum-title" class="swal2-input" placeholder="Enter the forum title">
    <textarea style="margin:30px" id="forum-description" class="swal2-textarea" placeholder="Enter the forum description"></textarea>
  `,
      focusConfirm: false,
      preConfirm: () => {
        const title = (document.getElementById('forum-title') as HTMLInputElement).value;
        const description = (document.getElementById('forum-description') as HTMLTextAreaElement).value;
        if (!title || !description) {
          Swal.showValidationMessage('Please enter both title and description');
          return null;
        }
        return { title, description };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.forum.title = result.value.title;
        this.forum.description = result.value.description;
        this.forum.userUrl = this.AuthService.decodeToken().id;
        console.log(this.forum.userUrl);
        
        this.createForum(result.value.title, result.value.description ,this.forum.userUrl);
      }
    });
  }




    createForum(title: string, description: string,userUrl:string) {
      const forumData = { title, description ,userUrl};
      this.forumService.addForum(forumData).subscribe(
        (response) => {
          this.forums.push(response);

          Swal.fire('Success', 'Forum created successfully', 'success');
          // Optionally, refresh the forum list or navigate to the new forum
        },
        (error) => {
          Swal.fire('Error', 'Failed to create forum', 'error');
        }
      );
    }
    openeditForumDialog(forum: any,id:string) {
      Swal.fire({
        title: 'Edit Forum',
        html: `
        <input id="forum-title" class="swal2-input" value="${forum.title}">
        <textarea style="margin:30px" id="forum-description" class="swal2-textarea">${forum.description}</textarea>
      `,
        focusConfirm: false,
        preConfirm: () => {
          const title = (document.getElementById('forum-title') as HTMLInputElement).value;
          const description = (document.getElementById('forum-description') as HTMLTextAreaElement).value;
          if (!title || !description) {
            Swal.showValidationMessage('Please enter both title and description');
            return null;
          }
          return { title, description };
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          this.editForum(id, result.value.title, result.value.description);
        }
      });
    }
    editForum(forumId: string, title: string, description: string) {
      const forumData = { title, description, userUrl:this.AuthService.decodeToken().id };
      this.forumService.editForum(forumId, forumData).subscribe(
        (response) => {
          const updatedForums = this.forums.map((forum) =>
            forum.id === forumId ? response : forum
          );
          console.log(updatedForums);
          
          this.forums = updatedForums;
          this.cdr.detectChanges(); // Manually trigger change detection

          Swal.fire('Success', 'Forum updated successfully', 'success');
        },
        (error) => {
          Swal.fire('Error', 'Failed to update forum', 'error');
        }
      );
    }

    //DeleteForum
    deleteForum(forumId: string) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this forum!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          this.forumService.DeleteForum(forumId).subscribe(
            (response) => {
              console.log(response);
              
              this.forums = this.forums.filter((forum) => forum.id !== forumId);
              //Detect change s
              this.cdr.detectChanges();
              Swal.fire('Success', 'Forum deleted successfully', 'success');
            },
            (error) => {
              console.log(error);
              Swal.fire('Error', 'Failed to delete forum', 'error');
            }
          );
        }
      });
    }
    // getUserID
    getUserID()
    {
      return this.AuthService.decodeToken().id;
    }
  }
  
  



  
