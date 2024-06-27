# Questions

I need to have a role based sign in or sign up. After clicking Sign In or Sign Up on the first screen in app/index, they should be asked are you a... Teacher or Parent? Depending on what they click they are sent to auth/teacher or auth/parent. If "teacher"-> sign-in/teacher if "parent" -> sign-in/parent". Role props should be passed down to dynamically send to signin or signup pages. Big question, should the role buttons be done in the app/(auth) folder or the app root folder?

> I created the roles in the auth folder adding a teacher and parent folder.
> Roles are dynamic so more roles can be added later.

# Future Considerations

## ROLES TO ADD

> Student...
>
> > so they can buy things at home with their phone.

> Admin...
>
> > so the school can be visible on the go.
