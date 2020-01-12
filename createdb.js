var db = require('./backend-updated/models/index');

db.sequelize.sync({force:true}).then(async () => {
    console.log('tables created')

    let user = await db.Users.create({
        sureName: '',
        firstName: '',
       userMail:'',
       userPassword:''
    })

    let note = await db.Notes.create({
        nameNote:'',
        textNote:'',
        urlPicture:''
    })

    await db.UsersNotes.create({
        userId: user.id,
        noteId: note.id
    })
}).catch(() => {
    console.log('could not create tables')
})