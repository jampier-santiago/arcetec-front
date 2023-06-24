// Packages
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { CutTextPipe } from './pipes/cut-text.pipe';

@NgModule({
  declarations: [CutTextPipe],
  imports: [CommonModule],
  exports: [CutTextPipe],
})
export class SharedModule {}
