import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { concatMap } from 'rxjs/operators';

const unread$ = interval(5000)
  .pipe(concatMap(() => ajax.getJSON('http://localhost:7070/messages/unread')));
unread$.subscribe((value) => console.log(value));

unread$.subscribe((value) => {
  const msgContainer = document.querySelector('div.incoming');
  msgContainer.insertAdjacentHTML('afterBegin', `
    <div class="message">
      <div class="name-wrapper">
        <div class="email">
          ${value.from}
        </div>
        <div class="subject">
          ${value.subject}
        </div>
      </div>
      <div class="date-wrapper">
        ${value.received}
      </div>
    </div>
  `);
});
