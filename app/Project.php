<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Task;

class Project extends Model
{
    protected $fillable = ['name', 'description'];

    public function tasks (){
    	return	$this->hasMany(Task::class);
    }
}
