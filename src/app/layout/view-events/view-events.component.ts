import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-view-events',
  standalone: true,
  imports: [NgForOf, NgFor, CommonModule],
  templateUrl: './view-events.component.html',
  styleUrl: './view-events.component.scss'
})
export class ViewEventsComponent implements OnInit {

  public events: any[] = [];
  public programs: any;
  public selectedEventId: number | null = null;


  constructor(private eventsService: EventsService) {

  }

  ngOnInit(): void {
    this.getEventsWithPrograms();
  }


  public getEventsWithPrograms(): void {
    this.eventsService.getAllEventsWithProgramsAsync().subscribe(result => {
      this.events = result;
      console.log(this.events);
    })
  }



  public showPrograms(eventId: number) {
    this.selectedEventId = eventId;
  }


}
