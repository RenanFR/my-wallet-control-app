import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { BankStatementListComponent } from './bank-statement-list.component';
import { BankStatementProcessingStatus } from '../../../shared/models/bank-statement-processing-status';

export class WebSocketAPI {

    wsEndpoint: string = 'http://localhost:8080/wallet/walletws';

    messageTopic: string = '/topic/statements/user/*';

    stompClient: any;

    bankStatementListComponent: BankStatementListComponent;

    lastAccount: string;

    constructor(bankStatementListComponent: BankStatementListComponent) {
        this.bankStatementListComponent = bankStatementListComponent;
    }

    public connect(accountTopic: string): void {
        console.log('CONNECTING WITH WEB SOCKET')
        let ws = new SockJS(this.wsEndpoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        let accountToSubscribe: string = _this.messageTopic.replace('*', accountTopic);
        this.lastAccount = accountTopic;
        _this.stompClient.connect({}, function (frame) {

            _this.stompClient.subscribe(accountToSubscribe, function (event) {
                _this.handleReceived(event);
            });

        }, this.handleError);
    }

    public disconnect(): void {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("DISCONNECTED FROM WEB SOCKET");        
    }

    private handleError(error): void {
        console.log("HANDLING ERROR  " + error)
        setTimeout(() => {
            this.connect(this.lastAccount);
        }, 5000);
    }
    
    private handleReceived(message): void {
        const _this = this;
        const status = JSON.parse(message.body) as BankStatementProcessingStatus;
        _this.bankStatementListComponent.changeStatus(status);
    }

}