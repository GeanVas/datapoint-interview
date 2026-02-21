import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../../shared/models/task';
import { getStatusLabel } from '../../../shared/helpers/status';

@Component({
  selector: 'app-task-item',
  imports: [DatePipe],
  template: ` <div
    class="group flex items-center gap-4 p-4 bg-white  border border-slate-100  rounded-xl hover:shadow-md hover:border-slate-200 transition-all"
  >
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-3">
        <h4 class="text-sm font-bold text-slate-900  truncate">
          {{ task().title }}
        </h4>
        <span
          class="px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider bg-slate-100 text-slate-600"
          >{{ statusLabel() }}</span
        >
      </div>
      <div class="flex items-center gap-4 mt-1">
        <div class="flex items-center gap-1 text-xs text-slate-500">
          <span class="material-symbols-outlined text-sm">calendar_today</span>
          {{ task().date | date: 'yyyy-MM-dd' }}
        </div>
      </div>
    </div>
    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="p-1.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
        <span class="material-symbols-outlined">edit</span>
      </button>
    </div>
  </div>`,
})
export class TaskItem {
  task = input.required<Task>();

  statusLabel() {
    return getStatusLabel(this.task().status);
  }
}
