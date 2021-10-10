/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
var app = {
    
    initialize: function() {
        
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        
        document.getElementById("btnInserir").addEventListener("click",app.inserir);
        document.getElementById("btnListar").addEventListener("click",app.listar);
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        //window.db = window.sqlitePlugin.openDatabase({
        db = window.sqlitePlugin.openDatabase({
            name: 'my.db',
            location: 'default',            
            androidDatabaseProvider: 'system'
        });
        //window.db.transaction(function(tx) {tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (login, pass)');
        db.transaction(function(tx) {tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (login, pass)');
        }, function(error) {
            //console.log('Transaction ERROR: ' + error.message);
            alert('Transaction ERROR: ' + error.message);
        }, function() {
            //console.log('Banco e Tabela usuarios criados com sucesso!!!');
            alert('Banco e Tabela usuarios criados com sucesso!!!');
        });
    }, 
    
    inserir: function(){
        //console.log("function inserir(){...");
        //console.log(window.db);
        let login = document.getElementById("input_usuario").value;
        let pass = document.getElementById("input_senha").value;

        //window.db.transaction(function(tx) {tx.executeSql('INSERT INTO usuarios VALUES (?,?)', [login, pass]);
        db.transaction(function(tx) {tx.executeSql('INSERT INTO usuarios VALUES (?,?)', [login, pass]);
        }, function(error) {
            //console.log('Erro durante a transacao com o banco: ' + error.message);
            alert('Erro durante a transacao com o banco: ' + error.message);
        }, function() {
            //console.log('Insercao realizada com sucesso!!!');
            alert('Insercao realizada com sucesso!!!');
        });
    },
    
    listar: function(){
        //console.log("function listar(){...");
        //console.log(window.db);
        //window.db.executeSql('SELECT login, pass FROM usuarios', [], function(ignore,rs) {
        db.executeSql('SELECT login, pass FROM usuarios', [], function(ignore,rs) {
                //console.log("analisando rs");
                alert("analisando rs");
                //console.log(JSON.stringify(rs));
                alert(JSON.stringify(rs));
                //console.dir(rs);
                alert(rs);
                let i = 0;
                for(i = 0; i < rs.rows.length; i++){
                    alert("item "+i);
                    //console.log("item "+i);
                    let recordItem = rs.rows.item(i);
                    //console.log(JSON.stringify(recordItem));
                    alert(JSON.stringify(recordItem));
                }                
        }, function(error) {
            //console.log('Erro no SELECT: ' + error.message);
            alert('Erro no SELECT: ' + error.message);
        });
    }
};

app.initialize();