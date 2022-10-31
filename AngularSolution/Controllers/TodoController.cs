using AngularSolution.Models;
using AngularSolution.Services;
using Microsoft.AspNetCore.Mvc;

namespace AngularSolution.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly TodoService _service;

    public TodoController(TodoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<Todo>>> GetAll()
    {
        return Ok(await _service.GetAll());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetById(int id)
    {
        var todo = await _service.GetById(id);
        if (todo is null)
        {
            throw new InvalidOperationException("Todo does not exists");
        }

        return Ok(todo);
    }
    
    [HttpPost]
    public async Task<ActionResult<Todo>> Create(Todo todo)
    {
        if (todo is null)
        {
            throw new InvalidOperationException("Todo needs to be an object");
        }

        var newTodo = await _service.Add(todo);

        return Ok(newTodo);
    }

    [HttpPut]
    public async Task<IActionResult> Update(Todo todo)
    {
        var todoToUpdate = await _service.GetById(todo.Id);
        if (todoToUpdate is null)
        {
            throw new InvalidOperationException("Todo does not exists");
        }

        await _service.Update(todo);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var todo = await _service.GetById(id);
        if (todo is null)
        {
            throw new InvalidOperationException("Todo does not exists");
        }

        await _service.Delete(id);

        return Ok();
    }
}