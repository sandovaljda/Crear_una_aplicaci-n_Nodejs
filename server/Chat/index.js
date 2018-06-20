var express = require('express')
var Router = express.Router()

Router.get('/users', function(req, res){
    //get Usuario
})

Router.get('/messages', function(req, res){
    //get Mensajes
})

Router.post('/users', function(req, res){
    //post Usuario
})

Router.post('/messages', function(req, res){
    //post Mensajes
})

module.exports = Router

(function(document, window, undefined, $){
    (function (){
        return Chat = {
            //Todo el codigo
            apiUrl: '/chat',
            $userDataModal: $('#modalCaptura'),
            $btnMessage: $('#btnMessage'),
            $messageText: $('#messageText'),
            userName: '',

            Init: function(){
                var self = this
                this.fetchUserInfo(function (user){
                    self.renderUser(user)
                })
                watchMessages()
            },
            fetchUserInfo: function(callback){
                var self = this
                this.$userDataModal.openModal()
                var $GuardarInfo = $('.guardarInfo')
                $GuardarInfo.on('click', function(){
                    var nombre = $('.nombreUsuario').val()
                    var user = [{nombre: nombre, img: 'p2.png'}]
                    callback(user)

                    self.joinUser(user[0])

                    self.userName = nombre
                    self.$userDataModal.closeModal()
                })
                self.getInitialUsers()
            },
            getInitialUsers: function(){
                var self = this
                var endpoint = self.apiUrl + '/users'
                self.ajaxReques(endpoint, 'GET', {})
                    .done(function (data){
                        var users = data.current
                        self.renderUser(users)
                    }).fail(function (err){
                        console.log(err)
                    })
            },
            ajaxRequest: function(url, type, data){
                return $.ajax({
                    url: url,
                    type: type,
                    data: data
                })
            },
            joinUser: function(user){
                var self = this
                var endpoint = self.apiUrl + '/users'
                var userObj = {user: user}
                self.ajaxReques(endpoin, 'POST', userObj)
                    .done(function(confirm){
                        console.log(confirm)
                    }).fail(function(error){
                        alert(error)
                    })
            },
            rederUsers: function(users){
                var self = this
                var userList = $('.users-list')
                var userTemplate =  '<li class="collection-item avatar>' + 
                                    '<img src="image/:image:" class="circle">' + 
                                    '<span class="title">:nomble:</span>' +
                                    '<p><img src="image/online.png"/>En linea</p>' + 
                                    '</li>';
                users.map(function (user){
                    var newUser = userTemplate.replace(':image:', 'p2.jpg')
                                              .replace(':nombre:', user.nombre)
                })
            },
            watchMessages: function(){
                var self = this
                self.$messageText.on('keypress', function(e){
                    if(e.which == 13){
                        if($(this).val().trim()!=''){
                            var message = {
                                sender: self.userName,
                                text: $(this).val()
                            }
                            self.renderMessage(message)
                            $(this).val('')
                        }else{
                            e.preventDefault()
                        }
                    }
                })
                self.$btnMessage.on('click', function(){
                    if(self.$messageText.val().trim()!=''){
                        var message = {
                            sender: self.userName,
                            text: $(this).val
                        }
                        self.renderMessage(message)
                        self.$messageText.val('')
                    }
                })
            },
            renderMessage: function(message){
                var self = this
                var tipoMessaje = message.sender == self.userName ? 'recibidos' : 'enviados'
                var messageList = $('.historial-chat')
                var messageTemplate =   '<div class=":tipoMensaje:">' +
                                            '<div class="mensaje">' + 
                                                '<div class="imagen">' +
                                                    '<img src="image/p2.png" alt="Contacto"/>' + 
                                                '</div>' + 
                                                '<div class="texto">' +
                                                    '<span class="nombre">:nombre:</span><br>' +
                                                    '<span>:mensaje:</span>' +
                                                '</div>' +
                                                '<div class="hora">' +
                                                    '<span class="numHora">:hora:</span>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>';
                var currentDate = new Date()
                var newMessage = messageTemplate.replace(':tipoMensaje:', tipoMessaje)
                                                .replace(':nombre:', message.sender)
                                                .replace(':mensaje:', message.text)
                                                .replace(':hora:', currentDate.getHours() + ':' + currentDate.getMinutes())
                messageList.append(newMessage)
                $(".scroller-chat").animate({ scrollTop: $(".scroller-char").get(0).scrollHeight}, 500)
            }   
        }
    })()
    Chat.Init()
})(document, windown, undefined, jQuery)