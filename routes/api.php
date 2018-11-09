<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('projects', 'ProjectController@index');

Route::get('project/{id}', 'ProjectController@show');

Route::post('project/create', 'ProjectController@store');

Route::delete('project/delete/{id}', 'ProjectController@destroy');

Route::post('project/complete/{id}', 'ProjectController@completeProject');


Route::post('task/create', 'TaskController@store');
Route::post('task/complete/{id}', 'TaskController@completeTask');
Route::delete('task/delete/{id}', 'TaskController@destroy');
