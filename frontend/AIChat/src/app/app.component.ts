import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { ChatMessage } from './models/chat.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  chatMessages: ChatMessage[] = [];
  currentMessage: string = '';

  constructor(private chatService: ChatService) {

  }
  
  onSendMessage() {
    if (!this.currentMessage.trim()) {
      return;
    }
    
    const message = this.currentMessage;
    this.currentMessage = '';
    
    this.chatMessages.push({ content: message, role: 'user' });
    
    this.chatService.sendMessage(message).subscribe(response => {
      this.chatMessages.push({ content: response.content, role: 'assistant' });
    }, error => {
      console.error('Error sending message:', error);
      this.chatMessages.push({ 
        content: 'Помилка при відправці повідомлення', 
        role: 'assistant' 
      });
    });
  }

  newChat() {
    this.chatService.newChat().subscribe(response => {
      this.chatMessages = [];
    }, error => {
      console.error('Error starting new chat:', error);
    });
  }
}
