import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ObservableDemoService {
  basicObservable() {
    const data$ = new Observable((subscriber: Subscriber<any>) => {
      subscriber.next(100);
      subscriber.error();
      subscriber.complete();
    });

    data$.subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Stream completed!');
      },
    });
  }

  pipeObservable() {
    const data$ = new Observable((subscriber: Subscriber<any>) => {
      let counter = 0;
      const numbers = setInterval(() => {
        subscriber.next(counter);
        counter++;
      }, 1000);

      // this function will be called after the stream is completed
      return () => {
        clearInterval(numbers);
        console.log('Cleaned up');
      };
    });

    const subscription = data$
      .pipe(
        take(5),
        map((value) => value * 5)
      )
      .subscribe({
        next: (value) => {
          console.log(value);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Stream completed!');
        },
      });

    setTimeout(() => {
      subscription.unsubscribe();
      console.log('unsubscribed');
    }, 7000);
  }
}
