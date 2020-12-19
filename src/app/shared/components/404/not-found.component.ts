import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tav-not-found',
  template: `
    <div class="container">
      <div class="goblin-container">
        <img src="/app/assets/images/goblin.png" class="goblin" />
      </div>
      <div class="message-container">
        <div class="page-code">404</div>
        <div class="message">Grrrr...this place aint ready</div>
      </div>
    </div>
  `,
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
