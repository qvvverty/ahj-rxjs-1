import { from, interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, concatMap, pluck } from 'rxjs/operators';

function getMessageEl(messageObj) {
  const messageEl = document.createElement('div');
  messageEl.classList.add('message');

  let messageSubject = messageObj.subject;
  if (messageSubject.length > 15) {
    messageSubject = `${messageSubject.slice(0, 15)}...`;
  }

  const received = new Date(messageObj.received);
  const receivedTime = received.toLocaleString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const receivedDate = received.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  messageEl.innerHTML = `
    <div class="name-wrapper">
      ${messageObj.from}
    </div>
    <div class="subject-wrapper">
      ${messageSubject}
    </div>
    <div class="date-wrapper">
      ${receivedTime} ${receivedDate}
    </div>
  `;

  return messageEl;
}

const msgContainer = document.querySelector('div.incoming-massages');

const unread$ = interval(5000)
  .pipe(
    concatMap(
      () => from(ajax.getJSON('https://arcane-sierra.herokuapp.com/messages/unread'))
        .pipe(catchError(() => of({ messages: [] }))),
    ),
    pluck('messages'),
  );

unread$.subscribe({
  next: (messages) => {
    for (const message of messages) {
      msgContainer.prepend(getMessageEl(message));
    }
  },
  error: console.log,
});
