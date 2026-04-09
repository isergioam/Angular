import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { PostsApiService } from '../../services/posts-api.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-detalle-post-api',
  templateUrl: './detalle-post-api.html',
  styleUrl: './detalle-post-api.css'
})
export class DetallePostApiComponent implements OnInit {

   

  private postsApiService = inject(PostsApiService);

  private cdr = inject(ChangeDetectorRef);

  post?: Post;
  error = '';

  ngOnInit(): void {
    this.postsApiService.getPostById(1).subscribe({
      next: (dato) => {
        this.post = dato;
      },
      error: () => {
        this.error = 'No se pudo cargar el post';
      }
    });
  }
}