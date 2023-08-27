import User from "../models/user";
import Book from "../models/book";

const ignorePassword=(user) => {
    const {password,...rest} = user
    return rest
}

export const getUser= async (req,res,next)=>{
   try{
    const users= await User.find({})
    return res.status(200).json({users: users.map((user)=>ignorePassword(user.toJSON()))})
}catch (err){
    next(err)
}
} 

export const postBook= async(req,res,next)=>{
    try{
        const book= await Book.findOne({isbn: req.body.isbn})
        if (book === null){
        return res.status(404).json({err: "Book not found"})
    }
    if (book.borrowedBy.length === book.quantity){
        return req.status(400).json({err: "Book is not available"})
    }
    const user= await User.findById(req.body.userId)
    if(user === null){
        return res.status(404).json({err: "User not found"})
    }
    if (book.borrowedBy.includes(user.id)){
        return res.status(400).json({err: "You've already borrowed this book"})
    }
    await book.update({borrowedBy: [...book.borrowedBy,user.id]})
    const updatedBook = await Book.findById(book.id)
    return res.status(200).json({
        book:{
            ...updatedBook.toJSON(),
            availableQuantity: updatedBook.quantity - updatedBook.borrowedBy.length,
        },
    })
    }catch (err){
        next(err)
    }
}

export const postReturn = async(req,res,next)=>{
    try{
        const book = await Book.findOne({isbn: req.body.isbn})
        if(book === null){
            return res.status(404).json({err: "Book not found"})
        }
        const user = await User.findById(req.body.userId)
        if(user === null){
            return res.status(404).json({err: "User not found"})
        }
        if(!book.borrowedBy.includes(user.id)){
            return res.status(400).json({err: "You need to borrow this book first!"})
        }
        await book.update({
            borrowedBy: book.borrowedBy.filter((borrowedBy)=>!borrowedBy.equals(user.id)),
        });
        const updatedBook = await Book.borrowedBy.findById(book.id)
        return res.status(200).json({
            book: {
                ...updatedBook.toJSON(),
                availableQuantity: updatedBook.quantity - updatedBook.borrowedBy.length
            },
        })
    }catch(err){
        next (err)
    }
}

export const borrowedBook= async(req,res,next)=>{
    try{
        const result= await User.find({borrowedBy: {"$in":req.session.userId}})
        return req.status(200).json({books: result})
    }catch(err){
        next(err)
    }
}

export const showUser= async (req,res,next)=>{
    try{
        const user = await User.findById(req.session.userId)
        if (user === null){
            return res.status(404).json({error: "User not found"})
        }
        return res.status(200).json({user: ignorePassword(user.toJSON())})
    }catch(err){
        next (err)
    }
}

export const postLogin= async (req,res,next)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if (username === req.body.username){
            return res.status(404).json({error: "User not found"})
        }
        if (user.password !== req.body.password){
            return res.status(404).json({error: "Invalid Password"})
        }
        req.session.userId= user.id
        return res.status(200).json({user: ignorePassword(user.toJSON())})
    }catch(err){
        next (err)
    }
}

export const getLogout= (req,res)=>{
    req.session.destroy()
    return res.status(200).json({success: true})
}