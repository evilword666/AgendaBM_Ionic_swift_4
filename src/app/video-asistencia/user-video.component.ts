import { Component, Input } from '@angular/core';
import { StreamManager } from 'openvidu-browser';


@Component({
    selector: 'user-video',
    styles: [
        `
            ov-video {
                width: 100%;
                height: 100%;
            }
            div div {
                position: absolute;
                background: rgba(0,0,0,.7);
                padding: 5px 10px;
                color: #fff;
                border-radius: 0 0 4px 0;
                top:0;
                left:0;
                font-weight:400;
                font-size:12px;
            }
            p {
                margin: 0;
            }
        `,
    ],
    template: `
    <div style="width:100%; height:100%">
         <ov-video [streamManager]="streamManager"></ov-video>
         <div class="tag">{{getNicknameTag()}}</div>
     </div>
     `,
})
export class UserVideoComponent {

    @Input()
    streamManager: StreamManager;

    getNicknameTag() {
        try {
            return JSON.parse(this.streamManager.stream.connection.data).clientData;
        } catch (err) {
            console.error('ClientData is not JSON formatted');
        }
    }
}
