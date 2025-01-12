export interface Ticket {
title_tickets: string,
description_tickets: string,
status_tickets: string,
userStory:{
    id_users_stories:number;
  }
}

export interface TicketResponse {
  id_tickets:number,
  title_tickets: string,
  description_tickets: string,
  status_tickets: string,
  userStory:{
      id_users_stories:number;
    }
  }