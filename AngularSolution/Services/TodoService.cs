using AngularSolution.Models;
using AngularSolution.Data;
using Microsoft.EntityFrameworkCore;

namespace AngularSolution.Services;

public class TodoService
{
    private readonly DatabaseContext _context;
    private int nextId = 1;

    public TodoService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<List<Todo>> GetAll()
    {
        return await _context.todos.AsNoTracking().OrderBy((todo) => todo.Id).ToListAsync();
    }

    public async Task<Todo?> GetById(int id)
    {
        return await _context.todos.FirstOrDefaultAsync(todo => todo.Id == id);
    }

    public async Task<Todo> Add(Todo todo)
    {
        var lastTodo = await _context.todos.OrderBy(currentTodo => currentTodo.Id).LastOrDefaultAsync();
        if (lastTodo is not null)
        {
            nextId = lastTodo.Id + 1;
        }

        todo.Id = nextId;
        await _context.todos.AddAsync(todo);
        await _context.SaveChangesAsync();

        return todo;
    }

    public async Task Update(Todo todo)
    {
        var todoToUpdate = await _context.todos.FindAsync(todo.Id);
        if (todoToUpdate is null) return;

        todoToUpdate.Title = todo.Title;
        todoToUpdate.DueDate = todo.DueDate;

        _context.todos.Update(todoToUpdate);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var todo = await _context.todos.FindAsync(id);
        if (todo is null) return;

        _context.todos.Remove(todo);
        await _context.SaveChangesAsync();
    }
}