import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerSerivce {
    constructor(
        private ngxSpinnerService: NgxSpinnerService
    ) {

    }

    show(): void {
        this.ngxSpinnerService.show();
    }

    hide(): void {
        this.ngxSpinnerService.hide();
    }
}