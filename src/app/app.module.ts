import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [ReactiveFormsModule, HttpClientModule]
})
export class AppModule { }