import { nameof } from 'ng-toolkit-lib';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface UuidObject {
  id: string;
}

export interface AsyncStateObject {
  isBusy: boolean;
  error: Error;
}

export interface Dataset<T> extends AsyncStateObject {
  items: T[];
}

export interface Detail<T> extends AsyncStateObject {
  item: T;
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class DB {
  protected readonly delay = 3000;

  protected getTable<T>(entityName: string): { [key: string]: T } {
    return (
      (JSON.parse(localStorage.getItem(entityName)) as { [key: string]: T }) ||
      {}
    );
  }

  getItems<T>(entityName: string) {
    const table = this.getTable(entityName);
    return of(Object.keys(table).map((k) => table[k]) as T[]).pipe(
      delay(this.delay)
    );
  }

  getItem<T>(entityName: string, id: string) {
    return of(this.getTable(entityName)[id] as T).pipe(delay(this.delay));
  }

  setItem<T>(entityName: string, value: T) {
    const table = this.getTable(entityName);
    table[value[nameof<UuidObject>('id')]] = value;
    localStorage.setItem(entityName, JSON.stringify(table));
    return of(value).pipe(delay(this.delay));
  }

  deleteItem(entityName: string, id: string) {
    const table = this.getTable(entityName);
    delete table[id];
    localStorage.setItem(entityName, JSON.stringify(table));
    return of({}).pipe(delay(this.delay));
  }
}

export const db = new DB();

// export class CrudService<TSummary, TDetail> {
//     protected readonly descriptor = {
//         dataset: `${this.firstCharToLower(this.entityName)}s`,
//         detail: this.firstCharToLower(this.entityName),
//         ...this.crudActions(this.entityName)
//     };

//     get dataset() {
//         return this.store.state[this.descriptor.dataset] as Dataset<TSummary>;
//     }

//     get detail() {
//         return this.store.state[this.descriptor.detail] as Detail<TDetail>;
//     }

//     constructor(protected entityName: string, protected store: Store) { }

//     createItem(title: string) {
//         this.store.patchState(this.descriptor, {
//           todos: {
//             ...this.store.state.todos,
//             isBusy: true,
//             error: null
//           }
//         });

//         return db.setItem(<TodoDetail>{
//           id: uuid(),
//           title: title,
//           description: null,
//           createdAt: new Date(),
//           completed: false,
//         }).pipe(effect(
//           data => this.store.patchState(Action.createTodoCompleted, {
//             todos: {
//               ...this.store.state.todos,
//               isBusy: false,
//               error: null,
//               items: [<TodoSummary>{
//                 id: data.id,
//                 title: data.title,
//                 completed: false
//               }, ...this.store.state.todos?.items || []]
//             }
//           }),
//           error => this.store.patchState(Action.createTodoFailed, {
//             todos: {
//               ...this.store.state.todos,
//               isBusy: false,
//               error: error
//             }
//           })
//         ));
//       }

//       readItem(id: string) {
//         this.store.patchState(Action.readTodoStarted, {
//           todo: {
//             ...this.store.state.todo,
//             isBusy: true,
//             item: null
//           }
//         });

//         return db.getItem<TodoDetail>(id).pipe(effect(
//           data => this.store.patchState(Action.readTodoCompleted, {
//             todo: {
//               ...this.store.state.todo,
//               isBusy: false,
//               error: null,
//               item: data
//             }
//           }),
//           error => this.store.patchState(Action.readTodoFailed, {
//             todo: {
//               ...this.store.state.todo,
//               isBusy: false,
//               error: error
//             }
//           })
//         ));
//       }

//       updateItem(item: TodoDetail) {
//         this.store.patchState(Action.updateTodoStarted, {
//           todo: {
//             ...this.store.state.todo,
//             isBusy: true
//           }
//         });

//         return db.setItem(item).pipe(effect(
//           data => this.store.patchState(Action.updateTodoCompleted, {
//             todo: {
//               ...this.store.state.todo,
//               isBusy: false,
//               error: null,
//               item: data
//             }
//           }),
//           error => this.store.patchState(Action.updateTodoFailed, {
//             todo: {
//               ...this.store.state.todo,
//               isBusy: false,
//               error: error
//             }
//           })
//         ));
//       }

//     protected firstCharToLower(name: string) {
//         return name.replace(name[0], name[0].toLowerCase());
//     }

//     protected action(name: string)  {
//         return {
//             [name]: name
//         }
//     }

//     protected asyncActions(name: string)  {
//         return {
//             ...this.action(`${name}Started`),
//             ...this.action(`${name}Completed`),
//             ...this.action(`${name}Failed`)
//         }
//     }

//     protected crudActions(name: string) {
//         return {
//             ...this.asyncActions(`create${name}`),
//             ...this.asyncActions(`read${name}s`),
//             ...this.asyncActions(`read${name}`),
//             ...this.asyncActions(`update${name}`),
//             ...this.asyncActions(`delete${name}`)
//         }
//     }
// }
