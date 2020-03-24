import { Injectable, IterableDiffers } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import { Contact } from './contact';

import { environment } from 'environments/environment';
import { ApiService } from 'app/services/api.service';
import { KeyService } from 'app/services/key.service';
import { Chat } from './chat';
import { User } from './user';
import { ChatPreview } from './chatPreview';


@Injectable()
export class ChatService implements Resolve<any>
{
    contacts: Contact[];
    chats: Chat[];
    user: User;
    onChatSelected: BehaviorSubject<any>;
    onContactSelected: BehaviorSubject<any>;
    onChatsUpdated: Subject<any>;
    onUserUpdated: Subject<any>;
    onLeftSidenavViewChanged: Subject<any>;
    onRightSidenavViewChanged: Subject<any>;


    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private as: ApiService, private ks: KeyService
    ) {
        // Set the defaults
        this.onChatSelected = new BehaviorSubject(null);
        this.onContactSelected = new BehaviorSubject(null);
        this.onChatsUpdated = new Subject();
        this.onUserUpdated = new Subject();
        this.onLeftSidenavViewChanged = new Subject();
        this.onRightSidenavViewChanged = new Subject();
        this.contacts = [];
        this.chats = [];
        this.user = new User({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getContacts(),
                //this.getChats(),
            ]).then(
                ([chats, user]) => {
                    this.getUser();
                    this.chats = chats;
                    // this.user = user;
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    getChat(contactId): Promise<any> {
        const chatItem = this.user.chatList.find((item) => {
            return item.contactId === contactId;
        });

        
        return new Promise((resolve, reject) => {
            this.getChats(contactId)
            .then((response: any) => {
                const chat = response;
                let ChatObj = new Chat({
                    id: response
                })
                this.user.chatList = []
                response.ComponentList.forEach(item => {
                    this.user.chatList.push({
                        id : item.MsgID1,
                        contactId : contactId,
                        name : item.TitleZone1,
                        lastMessage : item.ContentZone1[0].Message,
                        lastMessageTime : item.ContentZone1[0].Time || "12.00AM",
                        unread : item.IsRead1 ? 1 : 0,
                    })
                });

                    const chatContact = this.contacts.find((contact) => {
                        return contact.id === contactId;
                    });

                    const chatData = {
                        chatId: chat.id,
                        dialog: chat.dialog,
                        contact: chatContact
                    };
                    
                    this.onChatSelected.next({ ...chatData });
                    
                }, reject);
                
            });
            
            // Create new chat, if it's not created yet.
            if (!chatItem) {
                this.createNewChat(contactId).then((newChats) => {
                    this.getChat(contactId);
                });
                return;
            }
    }

    /**
     * Create new chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    createNewChat(contactId): Promise<any> {
        return new Promise((resolve, reject) => {

            const contact = this.contacts.find((item) => {
                return item.id === contactId;
            });

            const chatId = FuseUtils.generateGUID();

            const chat = {
                id: chatId,
                dialog: []
            };

            const chatListItem: ChatPreview = {
                lastMessage: "",
                contactId: contactId,
                id: chatId,
                lastMessageTime: '2017-02-18T10:30:18.931Z',
                name: contact.name,
                unread: null,
            };

            // Add new chat list item to the user's chat list
            this.user.chatList.push(chatListItem);

            // Post the created chat
            this._httpClient.post('api/chat-chats', { ...chat })
                .subscribe((response: any) => {

                    // Post the new the user data
                    this._httpClient.post('api/chat-user/' + this.user.id, this.user)
                        .subscribe(newUserData => {

                            // Update the user data from server
                            this.getUser().then(updatedUser => {
                                this.onUserUpdated.next(updatedUser);
                                resolve(updatedUser);
                            });
                        });
                }, reject);
        });
    }

    /**
     * Select contact
     *
     * @param contact
     */
    selectContact(contact): void {
        this.onContactSelected.next(contact);
    }

    /**
     * Set user status
     *
     * @param status
     */
    // setUserStatus(status): void {
    //     this.user.status = status;
    // }

    /**
     * Update user data
     *
     * @param userData
     */
    updateUserData(userData): void {
        this._httpClient.post('api/chat-user/' + this.user.id, userData)
            .subscribe((response: any) => {
                this.user = userData;
            }
            );
    }

    /**
     * Update the chat dialog
     *
     * @param chatId
     * @param dialog
     * @returns {Promise<any>}
     */
    updateDialog(chatId, dialog): Promise<any> {
        return new Promise((resolve, reject) => {

            const newData = {
                id: chatId,
                dialog: dialog
            };

            this._httpClient.post('api/chat-chats/' + chatId, newData)
                .subscribe(updatedChat => {
                    resolve(updatedChat);
                }, reject);
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            this.user.id = this.ks.userid;
            this.user.name = this.ks.FirstName + " " + this.ks.LastName;
            this.user.chatList = [];
            this.user.avatar = "../../../assets/images/avatars/Velazquez.jpg";
            this.user.mood = "Cool!";
            this.user.status = "";
            resolve(this.user)
        });
    }

    /**
     * Get chats
     *
     * @returns {Promise<any>}
     */
    getChats(userid:string): Promise<any> {
        return new Promise((resolve, reject) => {

            console.log(this.ks)
            
            let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).
                set("typ", "postmessageservice").
                set("skipno", "0").
                set("norec", "10").
                set("async", "true").
                set("dataType", "json").
                set("contentType", "application/json; charset=utf-8").
                set("auth", this.ks.key).
                set("postType", "MessagesList").
                set("nodeid", "").
                set("postmodel", "{}").
                set("userid", userid);


            this.as.post('https://xataapi.azurewebsites.net/api/v1.0.0/Actions', {}, headers)
                .subscribe((response:any) => {
                    resolve(response);
                    response.ComponentList.forEach(converstion => {
                        
                    });
                }, reject);
        });
    }


    public getContacts(): Promise<any> {

        return new Promise((resolve, reject) => {


            let headers = new HttpHeaders().set("Ocp-Apim-Subscription-Key", environment.Ocp_Apim_Subscription_Key).

                set("auth", this.ks.key).
                set("userid", "").
                set("busrid", this.ks.networkid).
                set("sitename", this.ks.sitenameVal).
                set("dataType", "json").
                set("Content-Type", "application/json; charset=utf-8");


            return this.as.get(environment.apiURL + `api/get/v1.0.0/AccountGet`, headers, "?emp=")
                .subscribe((response: any) => {

                    response.UserList.forEach(item => {
                        this.contacts.push({
                            id: item.ID,
                            name: item.FirstName + " " + item.LastName,
                            avatar: 'assets/images/avatars/profile.jpg',
                            mood: "",
                            status: "",
                            unread: "",
                        })
                    });;
                    /**
                     * can map the recieved object with the custom model we have defined in the UI.
                     * Can add additional variable values here
                     */

                    resolve(this.contacts);
                }, reject);

        });
    }
}
