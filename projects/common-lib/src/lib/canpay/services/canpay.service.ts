import { Injectable, OnDestroy } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';
import { ICanPay } from '../canpay-wizard/canpay-wizard.component';
import { CanpayModalComponent } from '../canpay-modal/canpay-modal.component';

export type SubscribeFn = (isConfirmed: boolean) => void;

@Injectable()
export class CanPayService implements OnDestroy {
  canPayModal;

  constructor(private dialogService: DialogService) { }

  ngOnDestroy() {
    this.close();
  }

  open(CanPay: ICanPay, subscribeFn: SubscribeFn = this.close) {
    this.canPayModal = this.dialogService.addDialog(CanpayModalComponent, { CanPay }).subscribe(subscribeFn);
  }

  close() {
    if (this.canPayModal) {
      this.canPayModal.unsubscribe();
    }
  }
}
