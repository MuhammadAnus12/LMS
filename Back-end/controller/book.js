import User from "../models/user"
import Book from "../models/book"

export const getBooks= async(req,res,next)=>{
    try{
 const books= await Book.find({})
 return res.status(200).json({books: books.map((book)=>({...book.toJSON(), availableQuantity: book.quantity - book.borrowedBy.length,})),
})
} catch (err){
    next (err)
}
}

export const getBooksByIsbn= async(req,res,next)=>{
    try{
        const book = await Book.findOne({isbn: req.params.bookIsbn})
        if (book == null){
            return res.status(404).json({err: "Book not found"})
        }
        return res.status(200).json({
            book: {
                ...book.toJSON(),
                availableQuantity: book.quantity - book.borrowedBy.length
            }
        })
    }catch(err){
        next(err)
    }
}