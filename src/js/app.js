import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { concatMap } from 'rxjs/operators';

const unread$ = interval(5000)
  .pipe(concatMap(() => ajax.getJSON('http://localhost:7070/messages/unread')));
unread$.subscribe((value) => console.log(value));
