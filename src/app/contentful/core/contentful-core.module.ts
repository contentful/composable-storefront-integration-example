import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { contentfulDecorators } from './decorators';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [...contentfulDecorators],
})
export class ContentfulCoreModule {}
