<?php

namespace App\Http\Controllers\Team;

use App\Http\Controllers\Controller;
use App\Http\Requests\QueryParamsRequest;
use App\Jobs\SendTeamInviteEmail;
use Illuminate\Support\Str;
use App\Models\Team\TeamMember;
use App\Models\User;
use App\Models\UserTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use enshrined\svgSanitize\Sanitizer;

class TeamController extends Controller
{

    //USER MANAGEMENT
    public function employees(QueryParamsRequest $request)
    {

        // Get the filters from the URL query and other input values
        $search = $request->input('search');
        $limit = $request->input('limit', 25); // Default limit is 25 if not provided
        $col = $request->input('col', 'name'); // Default column is 'name' if not provided
        $sort = $request->input('sort', 'asc'); // Default sort direction is 'asc' if not provided

        // Build the query for employees
        $employeesQuery = User::query();

        // Apply search if provided
        if ($search) {
            $employeesQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhere('surname', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%")
                    ->orWhere('phone', 'like', "%$search%");
            });
        }

        // Apply sorting
        $employeesQuery->orderBy($col, $sort);

        // Paginate with the given limit
        $employees = $employeesQuery->paginate($limit);


        // Return a JSON response with Inertia and the required data
        return inertia('User/User/Index', [
            'users' => [
                'data' => $employees->items(), // List of employees
                'meta' => [
                    'total' => $employees->total(),
                    'current_page' => $employees->currentPage(),
                    'last_page' => $employees->lastPage(),
                    'per_page' => $employees->perPage(),
                ],
                'links' => [
                    'first' => $employees->url(1),
                    'last' => $employees->url($employees->lastPage()),
                    'prev' => $employees->previousPageUrl(),
                    'next' => $employees->nextPageUrl(),
                ]
            ]
        ]);
    }


    public function employeesDelete(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $user = User::whereId($id)->firstOrFail();
            $user->delete();

        } catch (\Exception $ex) {
            DB::rollBack();
            Log::info("TeamController->employeesDelete()->ExtensionSelector::deleteEmployee()\n".$ex->getMessage());

            return back()->withErrors(['message' => $ex->getMessage()]);

        }
        DB::commit();


        return back()->with(['message' => __('Deleted Successfully'), 'type' => 'success']);
    }

    public function employeesSave(Request $request)
    {

        $userIdExists = $request->get('user_id') !== "undefined"; // Determine if user_id exists
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15',
            'email' => $userIdExists ? 'required|email|unique:users,email,' . $request->user_id . ',id' : [
                'required',
                'email',
                'unique:users,email',
            ],
            'country' => 'nullable'
        ]);

        DB::beginTransaction();

        $user = (($request->user_id &&  $request->user_id != 'undefined') ? User::where('id', $request->user_id)->firstOrFail() : new User());

        $user->name = $request->name;
        $user->surname = $request->surname;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->country = $request->country;
        $user->status = $request->status;
        if($request->has('password')){
            $user->password = Hash::make($request->password);
        }
        $user->save();



        if ($request->hasFile('avatar')) {
            $path = 'storage/images/avatar/';
            $image = $request->file('avatar');
            if ($image->getClientOriginalExtension() == 'svg') {
                $image = self::sanitizeSVG($request->file('avatar'));
            }
            $image_name = Str::random(4).'-'.Str::slug($user->fullName()).'-avatar.'.$image->getClientOriginalExtension();
            // Image extension check
            $imageTypes = ['jpg', 'jpeg', 'png', 'svg', 'webp'];
            if (! in_array(Str::lower($image->getClientOriginalExtension()), $imageTypes)) {
                return back()->with(['message' => __('The file extension must be jpg, jpeg, png, webp or svg.'), 'type' => 'error']);
            }
            $image->move($path, $image_name);
            $user->update([
                'avatar' => $path.$image_name
            ]);
        }


        DB::commit();

        return back()->with('success', 'Successfully saved.');

    }


    public static function sanitizeSVG($uploadedSVG)
    {

        $sanitizer = new Sanitizer();
        $content = file_get_contents($uploadedSVG);
        $cleanedData = $sanitizer->sanitize($content);

        return $uploadedSVG;
    }

}
